# Contexto Global

- Este repositório é a pasta base do workspace único do VS Code.
- O AI-HUB permanece sempre como raiz das instruções, independentemente do diretório de trabalho informado.
- O diretório de trabalho informado pelo usuário define apenas o escopo operacional de manipulação de arquivos.
- Nunca substitua o AI-HUB como raiz de instruções ao receber um novo diretório de trabalho.
- Mantenha carregadas as instruções do AI-HUB durante toda a tarefa.
- Sempre gere mensagens de commit e respostas em português do Brasil (pt-BR).
- Sempre que o usuário informar um novo path de trabalho, apenas confirme que a decisão foi acatada, preservando o AI-HUB como raiz de instruções.
- Ao receber um novo path de trabalho, não execute análise, inspeção ou qualquer outra ação automaticamente.
- Só execute análises quando o usuário pedir explicitamente.
- Não espalhe arquivos de instrução nas pastas dos projetos clientes.
- Regras permanentes válidas para todos os projetos devem ser registradas aqui.
- Regras permanentes válidas para uma stack devem ir em `stacks/*.md`.
- Regras permanentes válidas para um único projeto devem ir em `projects/*.md`.
- Para acesso operacional a banco de dados via CLI local, use `skills/local/shared/dbcli-data-access/SKILL.md`.
- Sempre que uma regra permanente for alterada, regenere o contexto com `./build-install.sh`.
- Crie novos projetos em `~/Work/`.
- Nomes de pastas criadas diretamente na raiz de `~/Work/` devem ser em letras maiúsculas.
- A partir do segundo nível (subpastas dentro de `~/Work/<RAIZ>/`), use letras minúsculas.
- Ao publicar projetos no GitHub, use nomes de repositórios em letras minúsculas, independentemente do nome da pasta local.

# Diretrizes de Comportamento

## Modo Caveman (Economia de Tokens)

- Respostas estritamente diretas, sem saudações, introduções ou conclusões.
- Proibido narrar etapas intermediárias (ex: 'vou verificar', 'estou editando').
- Informe apenas o resultado final quando a tarefa for concluída.
- Mantenha o código limpo e sem comentários explicativos
