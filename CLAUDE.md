# AI-HUB

Arquivo gerado para claude.

## Contexto Global

# Contexto Global

- Este repositório é a pasta base do workspace único do VS Code.
- O diretório de trabalho real sempre será informado pelo usuário no início do chat.
- Use o diretório informado como escopo principal de edição, validação e análise.
- Sempre que o usuário informar um novo path de trabalho, apenas confirme que a decisão foi acatada.
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

## Seleção de Contexto

- Antes de implementar, identifique o projeto pelo caminho informado pelo usuário.
- Depois de identificar o projeto, leia o arquivo de projeto correspondente em `projects/`.
- Leia também os arquivos de stack listados para aquele projeto em `stacks/`.
- Para skills locais e reaproveitáveis, consulte `skills/generated/active-skills.md` e as coleções em `skills/`.
- Quando o usuário pedir para registrar uma nova regra permanente, atualize o arquivo de stack ou projeto correto e depois regenere este contexto.

## Projetos

### AI-HUB

- Id: `ai-hub`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/AI-HUB`
- Arquivo local: `projects/ai-hub.md`
- Stacks: `git`, `typescript`

### OCEANPACT

- Id: `oceanpact`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/P12_OCEANPACT/GIT`
- Arquivo local: `projects/oceanpact.md`
- Stacks: `git`, `advpl-tlpp`, `sql`, `typescript`

### COMFRIO

- Id: `comfrio`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/P12_COMFRIO/GIT`
- Arquivo local: `projects/comfrio.md`
- Stacks: `git`, `advpl-tlpp`, `sql`, `typescript`

### MADEIRANIT

- Id: `madeiranit`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/P12_MADEIRANIT/GIT`
- Arquivo local: `projects/madeiranit.md`
- Stacks: `git`, `advpl-tlpp`, `sql`, `typescript`

### NORMATEL

- Id: `normatel`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/P12_NORMATEL/GIT`
- Arquivo local: `projects/normatel.md`
- Stacks: `git`, `advpl-tlpp`, `sql`, `typescript`

### PALUSA

- Id: `palusa`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/P12_PALUSA/SVN`
- Arquivo local: `projects/palusa.md`
- Stacks: `git`, `advpl-tlpp`, `sql`

### POWERSHELL

- Id: `powershell`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/POWERSHELL`
- Arquivo local: `projects/powershell.md`
- Stacks: `git`, `powershell`

### SCLOUD

- Id: `scloud`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/SCLOUD/GIT`
- Arquivo local: `projects/scloud.md`
- Stacks: `git`, `typescript`

### VSC-EXTENSIONS

- Id: `vsc-extensions`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/VSCEXTENSIONS`
- Arquivo local: `projects/vsc-extensions.md`
- Stacks: `git`, `typescript`

### GO-PROJECTS

- Id: `go-projects`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/GO/src`
- Arquivo local: `projects/go-projects.md`
- Stacks: `git`, `go`

### DBCLI

- Id: `dbcli`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/DBCLI`
- Arquivo local: `projects/dbcli.md`
- Stacks: `git`, `typescript`

### GOOGLE-SCRIPTS

- Id: `google-scripts`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/GOOGLE-SCRIPTS`
- Arquivo local: `projects/google-scripts.md`
- Stacks: `git`, `typescript`

### APPLE-SCRIPTS

- Id: `apple-scripts`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~ScriptEditor2/Documents`
- Arquivo local: `projects/apple-scripts.md`
- Stacks: `git`, `powershell`

### TOTVS-CLOUD

- Id: `totvs-cloud`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/TOTVSSP/CLOUD`
- Arquivo local: `projects/totvs-cloud.md`
- Stacks: `git`

### IBA

- Id: `iba`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/P12_IBA/GIT`
- Arquivo local: `projects/iba.md`
- Stacks: `git`, `advpl-tlpp`, `sql`, `typescript`

### PULVITEC

- Id: `pulvitec`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/P12_PULVITEC/GIT`
- Arquivo local: `projects/pulvitec.md`
- Stacks: `git`, `advpl-tlpp`, `sql`, `typescript`

### TOTVS-FONTES

- Id: `totvs-fontes`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/FONTES`
- Arquivo local: `projects/totvs-fontes.md`
- Stacks: `git`

### TRELLO

- Id: `trello`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/TRELLO`
- Arquivo local: `projects/trello.md`
- Stacks: `git`

### STREAMDECK

- Id: `streamdeck`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/STREAMDECK`
- Arquivo local: `projects/streamdeck.md`
- Stacks: `git`

### MAIL

- Id: `mail`
- Raiz real: `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/MAIL`
- Arquivo local: `projects/mail.md`
- Stacks: `git`

### SWIFT

- Id: `swift`
- Raiz real: `/Users/jcstorino/Swift`
- Arquivo local: `projects/swift.md`
- Stacks: `git`


## Stacks

### advpl-tlpp

# Stack AdvPL/TLPP

- Use para projetos Protheus/TOTVS.
- Linguagem padrão de interação e documentação: português do Brasil.
- Mantenha regras globais reutilizáveis desta stack aqui.
- Quando o usuário pedir para registrar uma nova restrição válida para qualquer projeto AdvPL/TLPP, atualize este arquivo.
- Use como pasta de referência para consulta:
  - `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/FONTES/FULL`
- Essa pasta contém fontes padrão do ERP TOTVS e deve ser usada como fonte importante de consulta para:
  - novas implementações
  - entendimento de rotinas do sistema
  - comparação com padrões nativos
- Ao detectar esta stack, considere também:
  - `skills/totvs/AGENTS.md`
  - `skills/totvs/CLAUDE.md`
- Após qualquer alteração em fonte `.prw`, `.prx` ou `.tlpp`, execute obrigatoriamente a pré-compilação local pelo skill `skills/local/advpl-tlpp/pre-compilacao/SKILL.md`.
- Após concluir a validação da pré-compilação local, remova a pasta `.totvs` para evitar que seus artefatos entrem em compilações amplas do projeto.
- Sempre que criar uma nova `Function`, `User Function` ou `Static Function`, preceda a declaração com o cabeçalho no formato do snippet `pdoc` definido em `~/Library/Application Support/Code - Insiders/User/snippets/advpl.json`.
- Para esse cabeçalho, use obrigatoriamente:
  - `@author       Julio Storino`
  - `@version      P12 Onça`
- Nomes reservados e proibidos nesta stack:
  - `nOpc` não deve ser usado como nome de variável.
  - `Function` é reservado ao produto padrão e não deve ser usado em customizações; use `User Function` para rotinas públicas e `Static Function` para auxiliares.
- Variáveis usadas como índice ou contador em `For`, `While`, `Do While` ou qualquer outro loop devem estar declaradas como `Local` na função ou método que contém o loop.
  - Exemplo: declare `Local nX := 0` antes de usar `For nX := 1 To Len(aItens)`.
  - Ao receber a solicitação "valide se as variaveis de loop estao declaradas como local", revise todos os loops do escopo solicitado e informe ou corrija qualquer variável de controle sem declaração `Local`.
- Limites de nomenclatura para fontes `.prw`:
  - variáveis devem ter no máximo 10 caracteres.
  - nomes de `User Function` devem ter no máximo 8 caracteres, pois recebem o prefixo `U_` em tempo de chamada.
  - nomes de `Static Function` devem ter no máximo 10 caracteres.
- Ao montar manualmente uma chave para `DbSeek()` ou `MsSeek()`, respeite o tamanho integral de cada campo do índice.
  - Campos de filial devem ser preenchidos à direita com espaços até o tamanho definido no SX3 antes de concatenar os próximos componentes da chave.
  - Exemplo para `A3_FILIAL` com tamanho 6: `PadR("03", TamSX3("A3_FILIAL")[1]) + cCodVendedor`.
  - Prefira `xFilial()` ou `FWxFilial()` quando aplicável, pois retornam a filial adequada ao compartilhamento da tabela.
- Roteamento por intenção:
  - validar pre-compilação local com `advpls appre`: `skills/local/advpl-tlpp/pre-compilacao/SKILL.md`
  - mapear contexto e arquivos relacionados: `skills/totvs/advpl-tlpp/context-map/SKILL.md`
  - revisar fonte AdvPL/TLPP: `skills/totvs/advpl-tlpp/code-review/SKILL.md`
  - montar query Protheus: `skills/totvs/advpl-tlpp/query-builder/SKILL.md`
  - revisar SQL: `skills/totvs/advpl-tlpp/sql-code-review/SKILL.md`
  - otimizar SQL: `skills/totvs/advpl-tlpp/sql-optimization/SKILL.md`
  - criar ponto de entrada: `skills/totvs/advpl-tlpp/entry-point-designer/SKILL.md`
  - documentar Protheus.doc: `skills/totvs/advpl-tlpp/documentation-writer/SKILL.md`
  - refatorar fonte: `skills/totvs/advpl-tlpp/refactor/SKILL.md`
  - reduzir complexidade de método: `skills/totvs/advpl-tlpp/refactor-method-complexity-reduce/SKILL.md`
  - migrar AdvPL para TLPP: `skills/totvs/advpl-tlpp/advpl-to-tlpp-migration/SKILL.md`
  - gerar endpoint REST em TLPP: `skills/totvs/advpl-tlpp/tlpp-rest-endpoint-generator/SKILL.md`
  - gerar cliente FWRest: `skills/totvs/advpl-tlpp/fwrest-client-generator/SKILL.md`
  - gerar MVC Protheus: `skills/totvs/advpl-tlpp/mvc-generator/SKILL.md`
  - consultar dicionário de dados: `skills/totvs/advpl-tlpp/data-dictionary-lookup/SKILL.md`
  - gerar teste TIR: `skills/totvs/advpl-tlpp/tir-test-generator/SKILL.md`
  - converter encoding para CP1252: `skills/totvs/advpl-tlpp/utf8-to-cp1252-conversion/SKILL.md`
  - planejar implementação: `skills/totvs/advpl-tlpp/create-implementation-plan/SKILL.md`
  - conduzir trabalho grande e orientado a especificação: `skills/totvs/advpl-tlpp/advpl-tlpp-sdd/SKILL.md`

#### Referências TOTVS para esta stack

- Prioridade alta: `skills/totvs/CLAUDE.md`
- Referência complementar: `skills/totvs/AGENTS.md`

### git

# Stack Git

- Preserve mudanças do usuário.
- Não reverta mudanças não relacionadas sem pedido explícito.
- Prefira comandos não interativos.

### go

# Stack Go

- Use para projetos Go.
- Mantenha regras globais reutilizáveis desta stack aqui.

### powershell

# Stack PowerShell

- Use para scripts e automações PowerShell.
- Mantenha regras globais reutilizáveis desta stack aqui.
- Skills da comunidade para PowerShell devem ser ligados a esta stack.

### sql

# Stack SQL

- Use para projetos que trabalhem intensamente com consultas e tuning.
- Mantenha regras globais reutilizáveis de modelagem, consultas e revisão aqui.

### typescript

# Stack TypeScript

- Use para projetos Node.js e VS Code.
- Mantenha regras globais reutilizáveis desta stack aqui.
- Regras de framework ou convenções compartilhadas entram aqui.

## Skills Curados

# Skills Ativos

Use os skills abaixo como base prioritária para projetos AdvPL/TLPP.

## context-map

- Título: Mapeamento de contexto
- Escopo: advpl-tlpp
- Quando usar: Antes de alterar fontes Protheus e quando for preciso localizar arquivos e padrões relacionados.
- Fonte: `skills/totvs/advpl-tlpp/context-map/SKILL.md`

## query-builder

- Título: Construção de SQL Protheus
- Escopo: advpl-tlpp, sql
- Quando usar: Para criar consultas em tabelas Protheus com filtros obrigatórios, filial e prevenção de problemas comuns.
- Fonte: `skills/totvs/advpl-tlpp/query-builder/SKILL.md`

## entry-point-designer

- Título: Pontos de entrada
- Escopo: advpl-tlpp
- Quando usar: Para criar ou revisar entry points e uso de PARAMIXB.
- Fonte: `skills/totvs/advpl-tlpp/entry-point-designer/SKILL.md`

## code-review

- Título: Revisão AdvPL/TLPP
- Escopo: advpl-tlpp
- Quando usar: Para auditoria de qualidade, segurança, performance e aderência ao framework TOTVS.
- Fonte: `skills/totvs/advpl-tlpp/code-review/SKILL.md`

## documentation-writer

- Título: Documentação Protheus.doc
- Escopo: advpl-tlpp
- Quando usar: Para gerar ou padronizar documentação de funções, classes e métodos.
- Fonte: `skills/totvs/advpl-tlpp/documentation-writer/SKILL.md`

## refactor

- Título: Refatoração segura
- Escopo: advpl-tlpp
- Quando usar: Para reduzir duplicação, melhorar legibilidade e manter comportamento existente.
- Fonte: `skills/totvs/advpl-tlpp/refactor/SKILL.md`

## utf8-to-cp1252-conversion

- Título: Conversão de encoding
- Escopo: advpl-tlpp
- Quando usar: Após gerar ou editar fontes AdvPL/TLPP que precisem continuar compatíveis com o compilador Protheus.
- Fonte: `skills/totvs/advpl-tlpp/utf8-to-cp1252-conversion/SKILL.md`
