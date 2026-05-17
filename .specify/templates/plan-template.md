# Plano de Implementação: [FEATURE]

**Branch**: `[###-feature-name]` | **Data**: [DATE] | **Spec**: [link]
**Entrada**: Especificação da feature em `/specs/[###-feature-name]/spec.md`

**Nota**: Este template é preenchido pelo comando `/speckit.plan`. Consulte `.specify/templates/plan-template.md` para o fluxo de execução.

## Resumo

[Extraia da especificação: requisito principal + abordagem técnica a partir da pesquisa]

## Contexto Técnico

<!--
  AÇÃO NECESSÁRIA: Substitua o conteúdo desta seção pelos detalhes técnicos
  do projeto. A estrutura abaixo é orientativa para guiar a iteração.
-->

**Linguagem/Versão**: [ex.: Python 3.11, Swift 5.9, Rust 1.75 ou NEEDS CLARIFICATION]  
**Dependências Principais**: [ex.: FastAPI, UIKit, LLVM ou NEEDS CLARIFICATION]  
**Armazenamento**: [se aplicável, ex.: PostgreSQL, CoreData, arquivos ou N/A]  
**Testes**: [ex.: pytest, XCTest, cargo test ou NEEDS CLARIFICATION]  
**Plataforma-alvo**: [ex.: servidor Linux, iOS 15+, WASM ou NEEDS CLARIFICATION]
**Tipo de Projeto**: [ex.: library/cli/web-service/mobile-app/compiler/desktop-app ou NEEDS CLARIFICATION]  
**Metas de Performance**: [específicas do domínio, ex.: 1000 req/s, 10k linhas/s, 60 fps ou NEEDS CLARIFICATION]  
**Restrições**: [específicas do domínio, ex.: <200ms p95, <100MB memória, offline-capable ou NEEDS CLARIFICATION]  
**Escala/Escopo**: [específicos do domínio, ex.: 10k usuários, 1M LOC, 50 telas ou NEEDS CLARIFICATION]

## Checagem da Constitution

*GATE: Deve passar antes da pesquisa da Fase 0. Revalidar após o design da Fase 1.*

[Gates determinados com base no arquivo de constitution]

## Estrutura do Projeto

### Documentação (esta feature)

```text
specs/[###-feature]/
├── plan.md              # Este arquivo (saída do comando /speckit.plan)
├── research.md          # Saída da Fase 0 (comando /speckit.plan)
├── data-model.md        # Saída da Fase 1 (comando /speckit.plan)
├── quickstart.md        # Saída da Fase 1 (comando /speckit.plan)
├── contracts/           # Saída da Fase 1 (comando /speckit.plan)
└── tasks.md             # Saída da Fase 2 (comando /speckit.tasks - NÃO criado por /speckit.plan)
```

### Código-fonte (raiz do repositório)

<!--
  AÇÃO NECESSÁRIA: Substitua a árvore placeholder abaixo pelo layout concreto
  desta feature. Remova opções não usadas e expanda a estrutura escolhida com
  caminhos reais (ex.: apps/admin, packages/something). O plano final não deve
  conter rótulos de opção.
-->

```text
# [REMOVER SE NÃO USAR] Opção 1: Projeto único (PADRÃO)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVER SE NÃO USAR] Opção 2: Aplicação web (quando "frontend" + "backend" forem detectados)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVER SE NÃO USAR] Opção 3: Mobile + API (quando "iOS/Android" forem detectados)
api/
└── [igual ao backend acima]

ios/ ou android/
└── [estrutura específica da plataforma: módulos da feature, fluxos de UI, testes da plataforma]
```

**Decisão de Estrutura**: [Documente a estrutura selecionada e referencie os diretórios reais capturados acima]

## Rastreamento de Complexidade

> **Preencha SOMENTE se a Checagem da Constitution tiver violações que precisem de justificativa**

| Violação | Por que é necessária | Alternativa mais simples rejeitada porque |
|----------|----------------------|-------------------------------------------|
| [ex.: 4º projeto] | [necessidade atual] | [por que 3 projetos são insuficientes] |
| [ex.: Repository pattern] | [problema específico] | [por que acesso direto ao DB é insuficiente] |
