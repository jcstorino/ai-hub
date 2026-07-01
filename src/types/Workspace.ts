export interface WorkspaceFolderEntry {
    name?: string;
    path: string;
}

export interface WorkspaceConfig {
    workspaceFile: string;
    ignoreProjects?: string[];
}

export interface WorkspaceFileConfig {
    folders: WorkspaceFolderEntry[];
}

export interface WorkspaceProject {
    id: string;
    name: string;
    root: string;
    stacks: string[];
    projectFile: string;
    preferredSkills: string[];
}
