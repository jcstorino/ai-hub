---
name: advpl-tlpp-conventions
description: "Aplicar convencoes locais de desenvolvimento AdvPL/TLPP do AI-HUB, incluindo documentacao Protheus.doc, nomes reservados, limites de nomenclatura, variaveis de loop, acesso por chave e referencias de consulta. Use ao criar ou alterar fontes .prw, .prx ou .tlpp."
---

# Convencoes Locais AdvPL/TLPP

Use estas regras junto das skills TOTVS quando trabalhar em fontes AdvPL/TLPP.

## Regras

- Ao criar `Function`, `User Function` ou `Static Function`, preceda a declaracao com o cabecalho do snippet `pdoc` em `~/Library/Application Support/Code - Insiders/User/snippets/advpl.json`.
- No cabecalho, use `@author Julio Storino` e `@version P12 Onca`.
- Nunca use `nOpc` como nome de variavel.
- `Function` e reservado ao produto padrao; em customizacoes use `User Function` para rotinas publicas e `Static Function` para auxiliares.
- Variaveis usadas como indice ou contador em loops devem estar declaradas como `Local` na funcao ou metodo que contem o loop.
- Variaveis devem ter no maximo 10 caracteres.
- Nomes de `User Function` devem ter no maximo 8 caracteres.
- Nomes de `Static Function` devem ter no maximo 10 caracteres.
- Ao montar manualmente chaves para `DbSeek()` ou `MsSeek()`, respeite o tamanho integral de cada campo do indice.
- Preencha campos de filial a direita com espacos antes de concatenar os proximos componentes.
- Prefira `xFilial()` ou `FWxFilial()` quando aplicavel.

## Referencias

- Consulte `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/FONTES/FULL` para novas implementacoes, entendimento de rotinas e comparacao com padroes nativos.
- Na stack AdvPL/TLPP, consulte tambem `skills/totvs/AGENTS.md` e `skills/totvs/CLAUDE.md`.
