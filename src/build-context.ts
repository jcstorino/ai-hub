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
const projectFiles = workspaceProjects.map((project) => ({
    project,
    content: ensureProjectFile(project),
}));

fs.mkdirSync(resolveFromRoot('build', 'generated', 'project-context'), {
    recursive: true,
});
writeText(
    'skills/generated/active-skills.md',
    renderActiveSkills(curated.advplTlpp)
);
writeText('AGENTS.md', renderAgents('codex'));
writeText('CLAUDE.md', renderAgents('claude'));

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
        'Este arquivo e somente um bootstrap.',
        '',
        '- Leia `global/base.md` para as regras globais.',
        '- Leia `build/generated/project-index.md` para localizar o projeto pelo caminho de trabalho.',
        '- Leia o arquivo correspondente em `projects/` e o contexto correspondente em `build/generated/project-context/`.',
        '- Leia somente as stacks listadas no projeto em `stacks/`.',
        '- Leia somente as skills necessarias, seguindo o roteamento da stack e `skills/generated/active-skills.md`.',
        '- Para registrar regras permanentes, altere `global/`, `projects/` ou `stacks/` e execute `./build-install.sh`.',
    ].join('\n');
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
