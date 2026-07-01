import fs from 'node:fs';
import path from 'node:path';
import { resolveFromRoot } from './lib/paths.js';
import { readWorkspaceProjects } from './lib/workspace.js';

interface InstructionItem {
    sourceFile: string;
    section: string;
    text: string;
}

interface Suggestion {
    item: InstructionItem;
    target: string;
    reason: string;
    duplicateIn?: string;
}

const projects = readWorkspaceProjects();
const sourceFiles = findManualAgents(resolveFromRoot('templates'));
const items = sourceFiles.flatMap(readInstructionItems);
const suggestions = items.map(classifyItem);
const report = renderReport(sourceFiles, suggestions);
const outputFile = resolveFromRoot(
    'build',
    'generated',
    'manual-agents-analysis.md'
);

fs.mkdirSync(resolveFromRoot('build', 'generated'), { recursive: true });
fs.rmSync(outputFile, { force: true });
fs.writeFileSync(outputFile, `${report}\n`);

console.log('Análise gerada em build/generated/manual-agents-analysis.md');

function findManualAgents(root: string) {
    const results = new Set<string>();
    if (fs.existsSync(root)) {
        walk(root, results);
    }

    return Array.from(results).sort();
}

function walk(directory: string, results: Set<string>) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            walk(fullPath, results);
            continue;
        }

        if (/^AGENTS\d*\.md$/i.test(entry.name)) {
            results.add(fullPath);
        }
    }
}

function readInstructionItems(file: string) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    const items: InstructionItem[] = [];
    let section = 'Sem seção';
    let paragraph: string[] = [];
    let inCodeBlock = false;

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed.startsWith('```')) {
            flushParagraph();
            inCodeBlock = !inCodeBlock;
            continue;
        }

        if (inCodeBlock || trimmed === '---') {
            continue;
        }

        if (trimmed.startsWith('#')) {
            flushParagraph();
            section = trimmed.replace(/^#+\s*/, '');
            continue;
        }

        if (trimmed.startsWith('- ')) {
            flushParagraph();
            items.push({
                sourceFile: file,
                section,
                text: trimmed.slice(2).trim(),
            });
            continue;
        }

        if (!trimmed) {
            flushParagraph();
            continue;
        }

        paragraph.push(trimmed);
    }

    flushParagraph();
    return items;

    function flushParagraph() {
        if (paragraph.length === 0) {
            return;
        }

        const text = paragraph.join(' ').trim();

        if (text.length > 0) {
            items.push({
                sourceFile: file,
                section,
                text,
            });
        }

        paragraph = [];
    }
}

function classifyItem(item: InstructionItem): Suggestion {
    const normalized = normalize(item.text);
    const duplicateIn = findDuplicate(normalized);

    if (duplicateIn) {
        return {
            item,
            target: 'Nenhuma mudança',
            reason: 'Instrução já existe na estrutura atual.',
            duplicateIn,
        };
    }

    const project = matchProject(item.text, item.sourceFile);
    const section = item.section.toUpperCase();

    if (section.includes('REGRAS GERAIS PARA ADVPL') && looksAdvpl(item.text)) {
        return {
            item,
            target: 'stacks/advpl-tlpp.md',
            reason: 'Regra geral da stack AdvPL/TLPP.',
        };
    }

    if (project) {
        if (looksGlobal(item.text)) {
            return {
                item,
                target: 'global/base.md',
                reason: 'Regra transversal para qualquer projeto.',
            };
        }

        if (looksAdvpl(item.text)) {
            return {
                item,
                target: 'stacks/advpl-tlpp.md',
                reason: 'Regra técnica de stack AdvPL/TLPP.',
            };
        }

        return {
            item,
            target: project.projectFile,
            reason: `Contexto específico do projeto ${project.name}.`,
        };
    }

    if (looksAdvpl(item.text)) {
        return {
            item,
            target: 'stacks/advpl-tlpp.md',
            reason: 'Regra técnica de stack AdvPL/TLPP.',
        };
    }

    if (looksGlobal(item.text)) {
        return {
            item,
            target: 'global/base.md',
            reason: 'Regra transversal para qualquer projeto.',
        };
    }

    return {
        item,
        target: 'Revisão manual',
        reason: 'Não foi possível classificar com segurança.',
    };
}

function matchProject(text: string, sourceFile: string) {
    const textOnly = text.toUpperCase();
    const byText = projects.find(
        (project) =>
            textOnly.includes(project.name.toUpperCase()) ||
            textOnly.includes(project.root.toUpperCase())
    );

    if (byText) {
        return byText;
    }

    if (sourceFile.includes('/templates/')) {
        return undefined;
    }

    const sourceOnly = sourceFile.toUpperCase();
    return projects.find(
        (project) =>
            sourceOnly.includes(project.name.toUpperCase()) ||
            sourceOnly.includes(project.root.toUpperCase())
    );
}

function looksAdvpl(text: string) {
    const source = text.toUpperCase();
    return [
        'ADVPL',
        'TLPP',
        'PROTHEUS',
        'FWXFILIAL',
        'CHANGEQUERY',
        'USER FUNCTION',
        'STATIC FUNCTION',
        'PROTHEUS.DOC',
        '.PRW',
        '.PRX',
        '.TLPP',
        'APPRE',
        'ADVPLS',
        'PARAMIXB',
        'CP1252',
        'WINDOWS-1252',
        'FULL',
        'TOTVS',
    ].some((token) => source.includes(token));
}

function looksGlobal(text: string) {
    const source = text.toUpperCase();
    return [
        'DIRETÓRIO DE TRABALHO',
        'DIRETORIO DE TRABALHO',
        'PASTA BASE',
        'WORKSPACE',
        'TODOS OS PROJETOS',
        'PROJETO ATUAL',
        'NÃO ESPALHE',
        'NAO ESPALHE',
    ].some((token) => source.includes(token));
}

function findDuplicate(normalized: string) {
    const candidates = [
        'global/base.md',
        ...fs.readdirSync(resolveFromRoot('stacks')).map((file) => `stacks/${file}`),
        ...fs.readdirSync(resolveFromRoot('projects')).map((file) => `projects/${file}`),
        'skills/totvs/AGENTS.md',
        'skills/totvs/CLAUDE.md',
    ];

    for (const candidate of candidates) {
        const fullPath = resolveFromRoot(candidate);

        if (!fs.existsSync(fullPath)) {
            continue;
        }

        const content = normalize(fs.readFileSync(fullPath, 'utf8'));

        if (content.includes(normalized) || normalized.includes(content)) {
            return candidate;
        }
    }

    return undefined;
}

function normalize(text: string) {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function renderReport(sourceFiles: string[], suggestions: Suggestion[]) {
    const sources = sourceFiles.map((file) => `- \`${file}\``).join('\n');
    const recommendations = suggestions
        .map((suggestion, index) => {
            const lines = [
                `### Item ${index + 1}`,
                '',
                '- Status: REVIEW',
                `- Target: \`${suggestion.target}\``,
                `- Fonte: \`${suggestion.item.sourceFile}\``,
                `- Seção: ${suggestion.item.section}`,
                `- Motivo: ${suggestion.reason}`,
                '- Texto:',
                '```text',
                suggestion.item.text,
                '```',
            ];

            if (suggestion.duplicateIn) {
                lines.push(`- Duplicado em: \`${suggestion.duplicateIn}\``);
            }

            lines.push('');
            return lines.join('\n');
        })
        .join('\n');

    return [
        '# Análise de AGENTS Manuais',
        '',
        `Data: ${new Date().toISOString()}`,
        '',
        '## Fontes',
        '',
        sources || '- Nenhuma fonte encontrada',
        '',
        '## Como revisar',
        '',
        '- Edite `- Status: REVIEW` para um destes valores:',
        '  - `APPROVED`',
        '  - `REJECTED`',
        '  - `REVIEW`',
        '- Ajuste `Target` se necessário.',
        '- Depois rode `npm run apply:agents-analysis`.',
        '',
        '## Recomendações',
        '',
        recommendations || 'Nenhuma recomendação',
    ].join('\n');
}
