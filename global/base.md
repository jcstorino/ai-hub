# Contexto Global

- Este repositório é a pasta base do workspace único do VS Code.
- O diretório de trabalho real sempre será informado pelo usuário no início do chat.
- Use o diretório informado como escopo principal de edição, validação e análise.
- Não espalhe arquivos de instrução nas pastas dos projetos clientes.
- Regras permanentes válidas para todos os projetos devem ser registradas aqui.
- Regras permanentes válidas para uma stack devem ir em `stacks/*.md`.
- Regras permanentes válidas para um único projeto devem ir em `projects/*.md`.
- Para acesso operacional a banco de dados via CLI local, use `skills/local/shared/dbcli-data-access/SKILL.md`.
- Sempre que uma regra permanente for alterada, regenere o contexto com `./build-install.sh`.
