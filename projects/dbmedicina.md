# DBMEDICINA

- Projeto Protheus/TOTVS.
- Use este contexto quando o diretório de trabalho estiver dentro da raiz DBMEDICINA.
- Priorize padrões ADVPL/TLPP, SQL Protheus e fluxo de compilação TOTVS.
- Regras permanentes específicas deste projeto ficam aqui.
- Quando o usuário se referir a `produção`, consulte a pasta:
  - `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/P12_DBMEDICINA/GIT/dbmedicina_producao`
- Quando o usuário se referir a `specs`, consulte a pasta:
  - `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/P12_DBMEDICINA/specs`
- Credenciais e endereços de ambiente ficam em `Rede.yaml`, na raiz do projeto; nunca exponha esse conteúdo fora do necessário.

## Boas práticas DBMEDICINA

- Aplicar as regras técnicas da cartilha `Boas práticas de programação Protheus Rev.1.2` ao projeto, preservando a precedência das instruções globais, da stack AdvPL/TLPP e das skills TOTVS quando houver conflito.
- Organizar cada fonte em bibliotecas/constantes/statics, identificação, declaração de variáveis, corpo e encerramento.
- Usar indentação de quatro espaços.
- Manter referências a campos com o alias completo da tabela e informar o alias nas funções de tabela, como `DbSkip()`, `DbSeek()` e `DbCloseArea()`.
- Usar `Begin Transaction`/`End Transaction` em rotinas que gravam dados.
- Manter variáveis declaradas com escopo explícito, preferindo `Local`; documentar qualquer necessidade de `Private` ou `Public`.
- Em TLPP, tipificar variáveis e informar valores padrão quando aplicável.
- Preferir programação orientada a objetos e classes nativas às funções facilitadoras quando ambas forem equivalentes.
- Para novas funções, manter o cabeçalho `Protheus.doc` conforme a skill local de convenções AdvPL/TLPP.
- Manter uma única `User Function` principal com o nome do arquivo; usar `Static Function` para as demais. Permitir função pública adicional somente para retorno/zeramento de statics ou execução por `StartJob`/`SmartJob`.
- Em `Static Function`, preferir nomes que identifiquem origem e finalidade, respeitando o limite de dez caracteres definido na stack.
- Para cadastros, usar MVC; não usar `AxCadastro`, `Modelo2` ou `Modelo3`.
- Para rotinas de processamento demoradas executadas por usuário, usar régua de processamento; suprimi-la em execução sem interface com `IsBlind()`.
- Usar `Help()` para erros e validações em pontos de entrada; reservar `MessageBox()` para rotinas próprias e usar `Aviso()` com resposta padrão ou timeout quando aplicável.
- Usar mensagens com parcimônia para não manter registros bloqueados; aplicar `OemToAnsi()` nos textos exibidos na interface quando necessário para compatibilidade de acentuação.
- Para Embedded SQL, usar alias dinâmico com `GetNextAlias()` e formatar datas e números na consulta quando aplicável.
- Para consultas parametrizadas, especialmente em laços, preferir `FWExecStatement` ou `FWPreparedStatement`, conforme as skills TOTVS.
- Em leituras SQL no SQL Server, usar a convenção `%nolock%` das skills TOTVS; não aplicar `NOLOCK` em Oracle.
- Para inclusões, alterações e exclusões, usar Sigaauto ou MVC quando a rotina nativa oferecer esses recursos; não manipular diretamente com `Replace` ou `FieldPut` nesses casos.
- Manipular dicionários SX e informações de empresa somente por funções e classes nativas; não abrir aliases de dicionário ou `SM0` diretamente.
- Usar `FWTemporaryTable` e alias criado por `GetNextAlias()` para tabelas temporárias; fechar e excluir a tabela ao terminar.
- Salvar e restaurar áreas alteradas com `FWGetArea()` e `FWRestArea()`, especialmente em pontos de entrada.
- Não alterar variáveis públicas nativas protegidas pelo Protheus; usar as alternativas homologadas para threads, jobs e WebServices.
- Alterar `cFilAnt` somente em situações justificadas, salvando e restaurando o posicionamento e usando `FWSM0Util` quando necessário.
- Em grids `MsGetDados`, usar `GdFieldGet`, `GdFieldPos`, `GdFieldPut`, `GdDeleted` e `GetDRefresh`; não aplicar essas funções a grids MVC.
- Nomear parâmetros customizados do projeto com o prefixo `DB_Z`.
- Usar `SuperGetMv()` para parâmetros estáveis e `GetMv()` para parâmetros que podem mudar durante a execução.
- Criar rotinas de processamento com suporte a execução manual e agendada, incluindo `SchedDef`, respostas automáticas e tratamento de `IsBlind()`.
- Evitar Views, Triggers, Stored Procedures e Functions no banco sem aprovação técnica prévia.
- Para APIs REST, usar endpoints com substantivos no plural, versionamento, verbos HTTP adequados, respostas JSON consistentes, códigos HTTP corretos, paginação quando aplicável, HTTPS, tokens e documentação Swagger/OpenAPI.
- Para integrações assíncronas, seguir o modelo de filas e a infraestrutura aprovada do projeto.
- Preferir Smart View para relatórios; justificar previamente qualquer alternativa.
- Usar nomes completos de funções e comandos AdvPL/TLPP, sem abreviações.
- Usar `FieldPos()` com o cursor completo ao validar campos customizados.

## Conciliação com TOTVS

- A recomendação da cartilha para `Embedded SQL`, `FWPreparedStatement`, `FWExecStatement` e `NOLOCK` é complementar; prevalecem as formas seguras e portáveis definidas nas skills TOTVS, especialmente `FWExecStatement`, parametrização e `%nolock%`.
- As regras da cartilha sobre MVC, tabelas temporárias, aliases dinâmicos, dicionários, áreas, transações, variáveis públicas e funções públicas reforçam as instruções existentes da stack e não as substituem.
