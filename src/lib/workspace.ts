import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { resolveFromRoot } from './paths.js';
import type {
    WorkspaceConfig,
    WorkspaceFileConfig,
    WorkspaceProject,
} from '../types/Workspace.js';

export function readWorkspaceConfig() {
    const file = resolveFromRoot('workspace.json');
    const content = fs.readFileSync(file, 'utf8');

    return JSON.parse(content) as WorkspaceConfig;
}

export function readWorkspaceProjects() {
    const config = readWorkspaceConfig();
    const workspaceFile = path.resolve(config.workspaceFile);
    const workspaceDir = path.dirname(workspaceFile);
    const workspaceContent = fs.readFileSync(workspaceFile, 'utf8');
    const parsed = ts.parseConfigFileTextToJson(workspaceFile, workspaceContent);

    if (parsed.error || !parsed.config) {
        throw new Error(`Falha ao ler workspace: ${workspaceFile}`);
    }

    const workspace = parsed.config as WorkspaceFileConfig;
    const ignored = new Set(
        (config.ignoreProjects ?? []).map((item) => item.toUpperCase())
    );

    return workspace.folders
        .map((folder) => {
            const name = (folder.name ?? path.basename(folder.path)).trim();
            const upperName = name.toUpperCase();

            if (ignored.has(upperName)) {
                return null;
            }

            const resolvedRoot = path.resolve(workspaceDir, folder.path);
            const id = normalizeId(name);

            return {
                id,
                name,
                root: resolvedRoot,
                stacks: inferStacks(name, resolvedRoot),
                projectFile: path.join('projects', `${id}.md`),
                preferredSkills: inferPreferredSkills(name, resolvedRoot),
            } satisfies WorkspaceProject;
        })
        .filter((project): project is WorkspaceProject => project !== null);
}

function normalizeId(value: string) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function inferStacks(name: string, root: string) {
    const source = `${name} ${root}`.toUpperCase();
    const stacks = new Set<string>(['git']);

    if (
        source.includes('P12_') ||
        source.includes('/SVN') ||
        ['PALUSA', 'MADEIRANIT', 'COMFRIO', 'NORMATEL', 'OCEANPACT', 'IBA', 'PULVITEC'].some((item) =>
            source.includes(item)
        )
    ) {
        stacks.add('advpl-tlpp');
        stacks.add('sql');
    }

    if (
        source.includes('POWERSHELL') ||
        source.includes('APPLE-SCRIPTS')
    ) {
        stacks.add('powershell');
    }

    if (
        source.includes('DBCLI') ||
        source.includes('VSC-EXTENSIONS') ||
        source.includes('GOOGLE-SCRIPTS') ||
        source.includes('AI-HUB') ||
        source.includes('/GIT')
    ) {
        stacks.add('typescript');
    }

    if (source.includes('GO-PROJECTS')) {
        stacks.add('go');
    }

    return Array.from(stacks);
}

function inferPreferredSkills(name: string, root: string) {
    const source = `${name} ${root}`.toUpperCase();

    if (source.includes('ADVPL-TLPP') || source.includes('P12_') || source.includes('/SVN')) {
        return [
            'context-map',
            'query-builder',
            'entry-point-designer',
            'code-review',
            'utf8-to-cp1252-conversion',
        ];
    }

    if (source.includes('POWERSHELL')) {
        return ['powershell-community'];
    }

    return [];
}
