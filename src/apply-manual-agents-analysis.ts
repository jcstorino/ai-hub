import fs from 'node:fs';
import { resolveFromRoot } from './lib/paths.js';

interface AnalysisItem {
    status: string;
    target: string;
    source: string;
    section: string;
    reason: string;
    text: string;
}

const analysisFile = resolveFromRoot(
    'build',
    'generated',
    'manual-agents-analysis.md'
);

if (!fs.existsSync(analysisFile)) {
    throw new Error('Arquivo de análise não encontrado.');
}

const content = fs.readFileSync(analysisFile, 'utf8');
const items = parseItems(content);
const approved = items.filter(
    (item) =>
        item.status === 'APPROVED' &&
        item.target !== 'Nenhuma mudança' &&
        item.target !== 'Revisão manual'
);

for (const item of approved) {
    applyItem(item);
}

console.log(`Itens aplicados: ${approved.length}`);

function parseItems(markdown: string) {
    const blocks = markdown.split(/^### Item \d+$/m).slice(1);

    return blocks.map((block) => ({
        status: matchLine(block, 'Status'),
        target: unwrap(matchLine(block, 'Target')),
        source: unwrap(matchLine(block, 'Fonte')),
        section: matchLine(block, 'Seção'),
        reason: matchLine(block, 'Motivo'),
        text: matchCodeBlock(block),
    }));
}

function matchLine(block: string, label: string) {
    const regex = new RegExp(`^- ${label}:\\s*(.+)$`, 'm');
    const match = block.match(regex);
    return match ? match[1].trim() : '';
}

function matchCodeBlock(block: string) {
    const match = block.match(/```text\n([\s\S]*?)\n```/);
    return match ? match[1].trim() : '';
}

function unwrap(value: string) {
    return value.replace(/^`|`$/g, '');
}

function applyItem(item: AnalysisItem) {
    const file = resolveFromRoot(item.target);

    if (!fs.existsSync(file)) {
        throw new Error(`Destino não encontrado: ${item.target}`);
    }

    const current = fs.readFileSync(file, 'utf8');

    if (current.includes(item.text)) {
        return;
    }

    const appended = [
        current.trimEnd(),
        '',
        '## Importado de Análise Manual',
        '',
        `- ${item.text}`,
    ].join('\n');

    fs.writeFileSync(file, `${appended}\n`);
}
