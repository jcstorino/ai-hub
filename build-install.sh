#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$ROOT_DIR"

find skills -name '.DS_Store' -delete >/dev/null 2>&1 || true
rm -rf .agents/skills .claude/skills
mkdir -p .agents/skills .claude/skills

while IFS= read -r skill_file; do
  skill_dir="${skill_file%/SKILL.md}"
  skill_key="${skill_dir#skills/}"
  skill_link_name="${skill_key//\//--}"

  ln -sfn "../../${skill_dir}" ".agents/skills/${skill_link_name}"
  ln -sfn "../../${skill_dir}" ".claude/skills/${skill_link_name}"
done < <(find skills -type f -name 'SKILL.md' ! -path '*/curated/*' ! -path '*/generated/*' | sort)

npm run build:context

WORKSPACE_FILE="$(node -e "const fs=require('fs'); const path=require('path'); const cfg=JSON.parse(fs.readFileSync(path.join(process.argv[1],'workspace.json'),'utf8')); process.stdout.write(cfg.workspaceFile || '');" "$ROOT_DIR")"
WORKSPACE_DIR="$(dirname "$WORKSPACE_FILE")"
FIRST_FOLDER_RELATIVE="$(ruby -e 'text=File.read(ARGV[0]); match=text.match(/"folders"\s*:\s*\[\s*\{\s*"name"\s*:\s*"[^"]+"\s*,\s*"path"\s*:\s*"([^"]+)"/m); print(match ? match[1] : "")' "$WORKSPACE_FILE")"
FIRST_FOLDER_PATH="$(node -e "const path=require('path'); const ws=process.argv[1]; const rel=process.argv[2]; process.stdout.write(rel ? path.resolve(path.dirname(ws), rel) : '');" "$WORKSPACE_FILE" "$FIRST_FOLDER_RELATIVE")"

mkdir -p "$HOME/.codex" "$HOME/.claude"

cat > "$HOME/.codex/AGENTS.md" <<EOF
Arquivo gerado por AI-HUB.

Hub principal: $ROOT_DIR
Workspace: $WORKSPACE_FILE
Primeira folder do workspace: $FIRST_FOLDER_PATH

Ao iniciar qualquer chat neste workspace:
- trate $ROOT_DIR como hub central de instrucoes
- consulte primeiro $ROOT_DIR/AGENTS.md
- use $ROOT_DIR/build/generated/project-index.md para localizar projetos e caminhos
- se o diretorio de trabalho apontar para um projeto listado, consulte tambem o arquivo correspondente em $ROOT_DIR/projects/
- carregue tambem as stacks citadas no projeto em $ROOT_DIR/stacks/
- para stacks com skills, consulte $ROOT_DIR/skills/generated/active-skills.md e os SKILL.md roteados nas stacks
- se o diretorio de trabalho estiver ambiguo, use a primeira folder do workspace como referencia-base
- quando regras permanentes forem alteradas, oriente regenerar com $ROOT_DIR/build-install.sh
EOF

cat > "$HOME/.claude/CLAUDE.md" <<EOF
Arquivo gerado por AI-HUB.

Hub principal: $ROOT_DIR
Workspace: $WORKSPACE_FILE
Primeira folder do workspace: $FIRST_FOLDER_PATH

Ao iniciar qualquer chat neste workspace:
- trate $ROOT_DIR como hub central de instrucoes
- consulte primeiro $ROOT_DIR/CLAUDE.md
- use $ROOT_DIR/build/generated/project-index.md para localizar projetos e caminhos
- se o diretorio de trabalho apontar para um projeto listado, consulte tambem o arquivo correspondente em $ROOT_DIR/projects/
- carregue tambem as stacks citadas no projeto em $ROOT_DIR/stacks/
- para stacks com skills, consulte $ROOT_DIR/skills/generated/active-skills.md e os SKILL.md roteados nas stacks
- se o diretorio de trabalho estiver ambiguo, use a primeira folder do workspace como referencia-base
- quando regras permanentes forem alteradas, oriente regenerar com $ROOT_DIR/build-install.sh
EOF
