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

mkdir -p .github
sed 's/Arquivo gerado para codex\./Arquivo gerado para copilot./' AGENTS.md > .github/copilot-instructions.md

WORKSPACE_FILE="$(node -e "const fs=require('fs'); const path=require('path'); const cfg=JSON.parse(fs.readFileSync(path.join(process.argv[1],'workspace.json'),'utf8')); process.stdout.write(cfg.workspaceFile || '');" "$ROOT_DIR")"
FIRST_FOLDER_RELATIVE="$(ruby -e 'text=File.read(ARGV[0]); match=text.match(/"folders"\s*:\s*\[\s*\{\s*"name"\s*:\s*"[^"]+"\s*,\s*"path"\s*:\s*"([^"]+)"/m); print(match ? match[1] : "")' "$WORKSPACE_FILE")"
FIRST_FOLDER_PATH="$(node -e "const path=require('path'); const ws=process.argv[1]; const rel=process.argv[2]; process.stdout.write(rel ? path.resolve(path.dirname(ws), rel) : '');" "$WORKSPACE_FILE" "$FIRST_FOLDER_RELATIVE")"

mkdir -p "$HOME/.codex" "$HOME/.claude"

cat > "$HOME/.codex/AGENTS.md" <<EOF
Arquivo gerado por AI-HUB.

Hub principal: $ROOT_DIR
Workspace: $WORKSPACE_FILE
Primeira folder do workspace: $FIRST_FOLDER_PATH

Arquivo de instrucoes local:
$ROOT_DIR/AGENTS.md
EOF

cat > "$HOME/.claude/CLAUDE.md" <<EOF
Arquivo gerado por AI-HUB.

Hub principal: $ROOT_DIR
Workspace: $WORKSPACE_FILE
Primeira folder do workspace: $FIRST_FOLDER_PATH

Arquivo de instrucoes local:
$ROOT_DIR/CLAUDE.md
EOF
