# AI-HUB

Camada central de contexto para agentes no workspace único do VS Code.

## Objetivo

- Centralizar instruções globais, por stack e por projeto.
- Reaproveitar skills locais de múltiplas fontes sem espalhar arquivos pelos projetos clientes.
- Gerar arquivos derivados para Codex, Claude e Copilot.

## Estrutura

- `global/`: regras gerais válidas para todos os projetos.
- `projects/`: regras específicas por projeto.
- `stacks/`: regras reutilizáveis por stack.
- `skills/<provider>/`: coleções locais de skills, como `totvs/` e `community/`.
- `skills/curated/`: curadoria do que é realmente usado.
- `src/`: scripts de sincronização e geração.
- `build-install.sh`: limpa artefatos indesejados e regenera contexto.

## Fluxo

1. Atualize `global/base.md`, `projects/*.md` ou `stacks/*.md`.
2. Coloque ou atualize coleções de skills dentro de `skills/`.
3. Rode `./build-install.sh`.
4. Os arquivos `AGENTS.md`, `CLAUDE.md` e `.github/copilot-instructions.md` serão regenerados.

## Regra de manutenção

Quando surgir uma nova instrução permanente:

- se valer para todos, atualize `global/base.md`
- se valer para vários projetos da mesma stack, atualize `stacks/<stack>.md`
- se valer só para um projeto, atualize `projects/<projeto>.md`
- depois regenere o contexto
