---
name: pre-compilacao
description: "Executar pre-compilacao local de fontes AdvPL/TLPP com advpls appre, resolvendo includes no servers.json, gerando artefatos em .totvs e validando stdout, stderr, log e saida preprocessada. Use quando o usuario pedir pre-compilar, validar alteracoes em .prw/.prx/.tlpp, rodar appre, checar includes para compilacao local ou diagnosticar falha de pre-processamento."
---

# Pre-compilacao AdvPL/TLPP

Use este skill quando houver alteracoes em `.prw`, `.prx` ou `.tlpp` e for necessario validar localmente com `advpls appre`.

## Binario obrigatorio

- Caminho absoluto padrao do `advpls` no macOS:
  - `~/.vscode-insiders/extensions/totvs.tds-vscode-2.0.16/node_modules/@totvs/tds-ls/bin/mac/advpls`
- Use sempre este caminho absoluto.
- Nao depender de `PATH`.

## Escopo

- Pre-compilacao local com `advpls appre`
- Resolucao de includes via `~/.totvsls/servers.json`
- Geracao de artefatos em `.totvs`
- Validacao de `exit code`, `stdout`, `stderr`, `log` e saida preprocessada
- Parada imediata na primeira falha

## Nao cobre

- Geracao de codigo
- Revisao de codigo
- Compilacao remota

## Fluxo

1. Identifique os fontes alterados `.prw`, `.prx` e `.tlpp`.
2. Resolva os includes conforme `servers.json`.
3. Limpe e recrie `.totvs`.
4. Execute `appre` no menor escopo util usando o caminho absoluto do binario:
   - arquivo unico: chamada direta no fonte
   - ate 10 arquivos: mesma chamada com os arquivos explicitados
   - mais de 10 arquivos: pre-compilacao em lote pela pasta base
5. Valide o resultado usando `stdout`, `stderr`, `appre.log` e a saida preprocessada.
6. Se houver falha, pare e mostre os artefatos obrigatorios.
7. Se houver sucesso, entregue a tabela final e a mensagem de status.

## Regras obrigatorias

- Sempre usar `advpls`, nunca inventar outro fluxo.
- Sempre executar `advpls` pelo caminho absoluto padrao do TDS.
- Sempre gerar artefatos dentro de `.totvs`.
- Nunca confiar apenas no `exit code`.
- Nunca prosseguir sem include valido.
- Nunca continuar para compilacao remota se o `appre` falhar.
- Reutilize includes ja resolvidos na mesma tarefa.
