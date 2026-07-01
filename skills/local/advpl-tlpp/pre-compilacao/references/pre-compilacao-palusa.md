# Referencia de Pre-compilacao AdvPL/TLPP

## Ferramentas

- CLI obrigatoria: `advpls`
- Arquivo de servidores: `~/.totvsls/servers.json`
- Local esperado do `advpls` no macOS:
  - `~/.vscode-insiders/extensions/totvs.tds-vscode-2.0.16/node_modules/@totvs/tds-ls/bin/mac`

## Regra de uso

- Sempre que houver alteracao em `.prw`, `.prx` ou `.tlpp`, executar pre-compilacao local antes de concluir o trabalho.
- Validar apenas os arquivos alterados.
- Para arquivo unico, preferir `appre` direto no arquivo.
- Para varios arquivos, parar na primeira falha.
- Todos os artefatos devem ficar em `.totvs`.

## Preparacao

```bash
rm -rf .totvs
mkdir -p .totvs
```

## Resolucao de includes

- Se servidor e ambiente ja estiverem definidos, use `includes` da configuracao correspondente no `servers.json`.
- Se nao estiverem definidos, use o `includes` global do topo do `servers.json`.
- Se houver mais de um include, repasse todos com multiplos `-I`.
- Nunca prossiga sem include valido.

## Execucao

### Arquivo unico

```bash
advpls appre "$FONTE" \
  -I "$INCLUDE_1" \
  -I "$INCLUDE_2" \
  -O ".totvs" \
  --log-file ".totvs/appre.log" \
  > ".totvs/appre.stdout.log" \
  2> ".totvs/appre.stderr.log"
```

### Multiplos arquivos

- Ignorar diferenca entre maiusculas e minusculas na extensao.
- Ate 10 arquivos: enviar cada fonte explicitamente, separado por espaco.
- Mais de 10 arquivos: enviar a pasta base para pre-compilacao em lote.
- Use execucao unitária por arquivo apenas para diagnostico complementar.

## Validacao obrigatoria

Sempre validar:

- `exit code`
- `stdout`
- `stderr`
- `appre.log`
- geracao de saida preprocessada

Saidas aceitas:

- `.ppo`
- `.ppx_prw`
- `.errprw` quando houver erro explicito de pre-processamento

## Considerar invalido se

- `exit code` diferente de `0`
- `stdout`, `stderr` ou log contiver:
  - `error`
  - `errors`
  - `C2001`
  - `C2002`
  - `C2006`
  - `C2090`
  - `File not found`
  - `precompiled with warnings and/or errors`
  - `One or more files have warnings and/or errors`
  - `has no valid content after precompiled`
- nenhuma saida preprocessada valida for gerada

## Atencao sem falha fatal

Se `exit code = 0`, houver saida preprocessada valida e nao houver erro explicito em `stdout`, `stderr` ou log:

- warning generico no resumo final nao bloqueia automaticamente o trabalho
- informe apenas que houve warning, sem detalhar causa quando ela nao estiver explicita

## Saida obrigatoria

Tabela:

```text
| Fonte | warnings | erros |
|---|---:|---:|
| x.prw | 0 | 0 |
```

Mensagem final:

```text
pre-compilacao ok !
```

ou

```text
pre-compilacao com erro !
```

## Em caso de erro

O agente deve:

1. parar imediatamente
2. nao continuar para compilacao remota
3. exibir `stdout`, `stderr` e `appre.log`
4. informar exatamente qual fonte falhou
