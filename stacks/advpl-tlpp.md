# Stack AdvPL/TLPP

- Use para projetos Protheus/TOTVS.
- Linguagem de interacao e documentacao: portugues do Brasil.
- Convencoes locais: `skills/local/advpl-tlpp/conventions/SKILL.md`.
- Pre-compilacao obrigatoria apos alteracao em `.prw`, `.prx` ou `.tlpp`: `skills/local/advpl-tlpp/pre-compilacao/SKILL.md`.
- Apos concluir a validacao da pre-compilacao local, remova a pasta `.totvs`.
- Para fontes padrao TOTVS, consulte `/Users/jcstorino/Library/Mobile Documents/com~apple~CloudDocs/Work/FONTES/FULL`.
- Para instrucoes TOTVS desta stack, consulte `skills/totvs/AGENTS.md` e `skills/totvs/CLAUDE.md`.

## Codigos de modulo Protheus

| Codigo | Modulo |
|--------|--------|
| 01 | Ativo Fixo |
| 02 | Compras |
| 03 | Contabilidade |
| 04 | Estoque/Custos |
| 05 | Faturamento |
| 06 | Financeiro |
| 07 | Gestão de Pessoal |
| 08 | Faturamento Serviço |
| 09 | Livros Fiscais |
| 10 | Planej.Contr.Produção |
| 11 | Veículos |
| 12 | Controle de Lojas |
| 13 | Call Center |
| 14 | Oficina |
| 15 | Protheus P Report Utility |
| 16 | Ponto Eletrônico |
| 17 | Easy Import Control |
| 18 | Terminal de Consulta de Funcionário |
| 19 | Manutenção de Ativos |
| 20 | Recrutamento e Seleção de Pessoal |
| 21 | Inspeção de Entradas |
| 22 | Metrologia |
| 23 | Front Loja |
| 24 | Controle de Documentos |
| 25 | Inspeção de Processos |
| 26 | Treinamento |
| 27 | Importação - Financeiro |
| 28 | Gestão de Serviços |
| 29 | Easy Export Control |
| 30 | Easy Financing |
| 31 | Easy Accounting |
| 32 | Administração de Força de Vendas |
| 33 | Plano de Saúde |
| 34 | Contabilidade Gerencial |
| 35 | Medicina e Segurança do Trabalho |
| 36 | Controle de Não-Conformidades |
| 37 | Controle de Auditoria |
| 38 | Controle de Estatístico de Processos |
| 39 | OMS - Gestão de Distribuição |
| 40 | Cargos e Salários |
| 41 | Auto Peças |
| 42 | WMS - Gestão de Armazenagem |
| 43 | TMS - Gestão de Transporte |
| 44 | Gestão de Projetos |
| 45 | Controle de Direitos Autorais |
| 46 | Automação Coleta de Dados |
| 47 | PPAP |
| 48 | Réplica |
| 49 | Gestão Educacional |
| 50 | Easy Drawback Control |
| 51 | Gestão Hospitalar |
| 52 | Viewer |
| 53 | Avaliação e Pesquisa de Desempenho |
| 54 | Gestão de Prefeituras |
| 55 | Sistema de Fidelização e Análise de Crédito |
| 56 | Gestão Ambiental |
| 57 | Planejamento e Controle Orçamentário |
| 58 | Gerenciamento de Pesquisa e Resultado |
| 59 | Gestão de Acervos |
| 60 | Pontos e Recintos Alfandegarios |
| 61 | HRP Gestão de Pessoas |
| 62 | HRP Ferramentas de Informação |
| 63 | HRP Planejamento e Desenvolvimento |
| 64 | Processos Trabalhistas |
| 65 | Gestão Advocatícia |
| 66 | Gestão de Riscos |
| 67 | Gestão Agrícola |
| 68 | Gestão de Armazéns Gerais |
| 69 | Gestão de Contratos |
| 70 | Arquitetura Organizacional |
| 71 | Locação de Veículos |
| 72 | Photo |
| 73 | Customer Relationship Management |
| 74 | Business Process Management |
| 75 | Apontamento/Ponto Eletrônico |
| 76 | Gestão Jurídica |
| 77 | Pré Faturamento de Serviço |
| 78 | Gestão de Frete Embarcador |
| 79 | Chão de Fábrica |
| 80 | Acessibilidade Visual |
| 81 | Monitoramento de Desempenho Logístico |
| 82 | Desenvolvedor de Produtos |
| 83 | Monitoramento de Apontamento |
| 84 | Produto Fiscal Unico |
| 85 | Easy Siscoserv |
| 86 | Vida Funcional |
| 87 | Gestao de Licitacao |
| 96 | Específicos II |
| 97 | Originacao de Graos |
| 98 | Específicos I |
| 99 | Configurador |

## Roteamento por intencao
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
