import fs from 'node:fs';
import path from 'node:path';
import { resolveFromRoot } from './lib/paths.js';
import { readWorkspaceProjects } from './lib/workspace.js';
import type { WorkspaceProject } from './types/Workspace.js';

interface CuratedSkill {
    id: string;
    title: string;
    scope: string[];
    when: string;
}

interface CuratedSkillsFile {
    advplTlpp: CuratedSkill[];
}

const workspaceProjects = readWorkspaceProjects();
const curated = readJson<CuratedSkillsFile>('skills/curated/active-skills.json');
const globalBaseContent = readText('global/base.md');
const projectFiles = workspaceProjects.map((project) => ({
    project,
    content: ensureProjectFile(project),
}));
const stackFiles = readStackFiles();

fs.mkdirSync(resolveFromRoot('build', 'generated', 'project-context'), {
    recursive: true,
});
fs.mkdirSync(resolveFromRoot('.github'), { recursive: true });

writeText(
    'skills/generated/active-skills.md',
    renderActiveSkills(curated.advplTlpp)
);
writeText('AGENTS.md', renderAgents('codex'));
writeText('CLAUDE.md', renderAgents('claude'));
writeText('.github/copilot-instructions.md', renderAgents('copilot'));

for (const { project, content } of projectFiles) {
    writeText(
        path.join('build', 'generated', 'project-context', `${project.id}.md`),
        renderProjectContext(project, content)
    );
}

writeText(
    path.join('build', 'generated', 'project-index.md'),
    renderProjectIndex()
);

console.log('Contexto gerado.');

function readJson<T>(relativePath: string) {
    const file = resolveFromRoot(relativePath);
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
}

function readText(relativePath: string) {
    return fs.readFileSync(resolveFromRoot(relativePath), 'utf8').trim();
}

function readStackFiles() {
    const dir = resolveFromRoot('stacks');
    const files = fs
        .readdirSync(dir)
        .filter((file: string) => file.endsWith('.md'))
        .sort();

    return files.map((file: string) => ({
        id: path.basename(file, '.md'),
        file,
        content: fs.readFileSync(path.join(dir, file), 'utf8').trim(),
    }));
}

function writeText(relativePath: string, content: string) {
    const file = resolveFromRoot(relativePath);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, `${content.trim()}\n`);
}

function renderAgents(target: 'codex' | 'claude' | 'copilot') {
    return [
        '# AI-HUB',
        '',
        `Arquivo gerado para ${target}.`,
        '',
        '## Contexto Global',
        '',
        globalBaseContent,
        '',
        '## Seleção de Contexto',
        '',
        '- Antes de implementar, identifique o projeto pelo caminho informado pelo usuário.',
        '- Depois de identificar o projeto, leia o arquivo de projeto correspondente em `projects/`.',
        '- Leia também os arquivos de stack listados para aquele projeto em `stacks/`.',
        '- Para skills locais e reaproveitáveis, consulte `skills/generated/active-skills.md` e as coleções em `skills/`.',
        '- Quando o usuário pedir para registrar uma nova regra permanente, atualize o arquivo de stack ou projeto correto e depois regenere este contexto.',
        '',
        '## Projetos',
        '',
        ...workspaceProjects.flatMap(renderProjectBullet),
        '',
        '## Stacks',
        '',
        ...stackFiles.flatMap((stack: { id: string; content: string }) =>
            renderStackSection(stack, target)
        ),
        '## Skills Curados',
        '',
        fs.readFileSync(
            resolveFromRoot('skills', 'generated', 'active-skills.md'),
            'utf8'
        ).trim(),
    ].join('\n');
}

function renderProjectBullet(project: WorkspaceProject) {
    return [
        `### ${project.name}`,
        '',
        `- Id: \`${project.id}\``,
        `- Raiz real: \`${project.root}\``,
        `- Arquivo local: \`${project.projectFile}\``,
        `- Stacks: ${project.stacks.map((stack: string) => `\`${stack}\``).join(', ')}`,
        '',
    ];
}

function renderActiveSkills(skills: CuratedSkill[]) {
    return [
        '# Skills Ativos',
        '',
        'Use os skills abaixo como base prioritária para projetos AdvPL/TLPP.',
        '',
        ...skills.flatMap((skill) => [
            `## ${skill.id}`,
            '',
            `- Título: ${skill.title}`,
            `- Escopo: ${skill.scope.join(', ')}`,
            `- Quando usar: ${skill.when}`,
            `- Fonte: \`skills/totvs/advpl-tlpp/${skill.id}/SKILL.md\``,
            '',
        ]),
    ].join('\n');
}

function renderProjectContext(project: WorkspaceProject, content: string) {
    return [
        `# ${project.name}`,
        '',
        `- Id: \`${project.id}\``,
        `- Raiz real: \`${project.root}\``,
        `- Arquivo fonte: \`${project.projectFile}\``,
        `- Stacks: ${project.stacks.map((stack: string) => `\`${stack}\``).join(', ')}`,
        `- Skills preferenciais: ${project.preferredSkills.map((skill: string) => `\`${skill}\``).join(', ') || 'nenhum'}`,
        '',
        content,
    ].join('\n');
}

function renderProjectIndex() {
    return [
        '# Índice de Projetos',
        '',
        ...projectFiles.map(
            ({ project }) =>
                `- \`${project.id}\` -> \`build/generated/project-context/${project.id}.md\``
        ),
    ].join('\n');
}

function ensureProjectFile(project: WorkspaceProject) {
    const file = resolveFromRoot(project.projectFile);

    if (!fs.existsSync(file)) {
        const content = [
            `# ${project.name}`,
            '',
            `- Projeto mapeado automaticamente do workspace.`,
            `- Raiz real: \`${project.root}\``,
            `- Stacks: ${project.stacks.map((stack: string) => `\`${stack}\``).join(', ')}`,
            '- Regras permanentes específicas deste projeto ficam aqui.',
        ].join('\n');

        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, `${content}\n`);
    }

    return fs.readFileSync(file, 'utf8').trim();
}

function renderStackSection(
    stack: { id: string; content: string },
    target: 'codex' | 'claude' | 'copilot'
) {
    const lines = [`### ${stack.id}`, '', stack.content, ''];

    if (stack.id === 'advpl-tlpp') {
        lines.push('#### Referências TOTVS para esta stack', '');

        if (target === 'claude') {
            lines.push('- Prioridade alta: `skills/totvs/CLAUDE.md`');
            lines.push('- Referência complementar: `skills/totvs/AGENTS.md`');
        } else {
            lines.push('- Prioridade alta: `skills/totvs/AGENTS.md`');
            lines.push('- Referência complementar: `skills/totvs/CLAUDE.md`');
        }

        lines.push('');
    }

    return lines;
}
