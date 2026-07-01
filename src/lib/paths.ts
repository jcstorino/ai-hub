import path from 'node:path';
import os from 'node:os';

export const repoRoot = process.cwd();

export function resolveFromRoot(...segments: string[]) {
    return path.join(repoRoot, ...segments);
}

export function expandHome(input: string) {
    if (input === '~') {
        return os.homedir();
    }

    if (input.startsWith('~/')) {
        return path.join(os.homedir(), input.slice(2));
    }

    return input;
}
