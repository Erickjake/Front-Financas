---

description: "Template de lista de tarefas para implementação de feature"
---

# Tarefas: [FEATURE NAME]

**Entrada**: Documentos de design em `/specs/[###-feature-name]/`
**Pré-requisitos**: plan.md (obrigatório), spec.md (obrigatório para histórias de usuário), research.md, data-model.md, contracts/

**Testes**: Os exemplos abaixo incluem tarefas de teste. Testes são OPCIONAIS - inclua apenas se forem explicitamente solicitados na especificação da feature.

**Organização**: As tarefas são agrupadas por história de usuário para permitir implementação e teste independentes de cada história.

## Formato: `[ID] [P?] [Story] Descrição`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: A qual história de usuário esta tarefa pertence (ex.: US1, US2, US3)
- Inclua caminhos exatos de arquivos nas descrições

## Convenções de Caminho

- **Projeto único**: `src/`, `tests/` na raiz do repositório
- **Aplicação web**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` ou `android/src/`
- Os caminhos abaixo assumem projeto único - ajuste conforme a estrutura em plan.md

<!--
  ============================================================================
  IMPORTANTE: As tarefas abaixo são EXEMPLOS apenas para ilustração.

  O comando /speckit.tasks DEVE substituir estas tarefas por tarefas reais com base em:
  - Histórias de usuário em spec.md (com prioridades P1, P2, P3...)
  - Requisitos da feature em plan.md
  - Entidades em data-model.md
  - Endpoints em contracts/

  As tarefas DEVEM ser organizadas por história de usuário para que cada história possa ser:
  - Implementada independentemente
  - Testada independentemente
  - Entregue como incremento de MVP

  NÃO mantenha estas tarefas de exemplo no tasks.md gerado.
  ============================================================================
-->

## Fase 1: Setup (Infraestrutura Compartilhada)

**Objetivo**: Inicialização do projeto e estrutura básica

- [ ] T001 Criar estrutura do projeto conforme o plano de implementação
- [ ] T002 Inicializar projeto [language] com dependências [framework]
- [ ] T003 [P] Configurar ferramentas de lint e formatação

---

## Fase 2: Fundacional (Pré-requisitos Bloqueantes)

**Objetivo**: Infraestrutura central que DEVE estar pronta antes de QUALQUER história de usuário

**⚠️ CRÍTICO**: Nenhum trabalho de história de usuário pode começar antes desta fase ser concluída

Exemplos de tarefas fundacionais (ajuste conforme o projeto):

- [ ] T004 Configurar schema de banco de dados e framework de migrations
- [ ] T005 [P] Implementar framework de autenticação/autorização
- [ ] T006 [P] Configurar roteamento de API e estrutura de middleware
- [ ] T007 Criar modelos/entidades base dos quais todas as histórias dependem
- [ ] T008 Configurar infraestrutura de tratamento de erros e logs
- [ ] T009 Configurar gerenciamento de ambiente

**Checkpoint**: Fundação pronta - implementação das histórias de usuário pode começar em paralelo

---

## Fase 3: História de Usuário 1 - [Título] (Prioridade: P1) 🎯 MVP

**Objetivo**: [Breve descrição do que esta história entrega]

**Teste Independente**: [Como verificar que esta história funciona isoladamente]

### Testes para História de Usuário 1 (OPCIONAL - somente se testes forem solicitados) ⚠️

> **NOTA: Escreva estes testes PRIMEIRO e garanta que FALHEM antes da implementação**

- [ ] T010 [P] [US1] Teste de contrato para [endpoint] em tests/contract/test_[name].py
- [ ] T011 [P] [US1] Teste de integração para [jornada de usuário] em tests/integration/test_[name].py

### Implementação da História de Usuário 1

- [ ] T012 [P] [US1] Criar modelo [Entity1] em src/models/[entity1].py
- [ ] T013 [P] [US1] Criar modelo [Entity2] em src/models/[entity2].py
- [ ] T014 [US1] Implementar [Service] em src/services/[service].py (depende de T012, T013)
- [ ] T015 [US1] Implementar [endpoint/feature] em src/[location]/[file].py
- [ ] T016 [US1] Adicionar validação e tratamento de erros
- [ ] T017 [US1] Adicionar logs para operações da história de usuário 1

**Checkpoint**: Neste ponto, a História de Usuário 1 deve estar funcional e testável independentemente

---

## Fase 4: História de Usuário 2 - [Título] (Prioridade: P2)

**Objetivo**: [Breve descrição do que esta história entrega]

**Teste Independente**: [Como verificar que esta história funciona isoladamente]

### Testes para História de Usuário 2 (OPCIONAL - somente se testes forem solicitados) ⚠️

- [ ] T018 [P] [US2] Teste de contrato para [endpoint] em tests/contract/test_[name].py
- [ ] T019 [P] [US2] Teste de integração para [jornada de usuário] em tests/integration/test_[name].py

### Implementação da História de Usuário 2

- [ ] T020 [P] [US2] Criar modelo [Entity] em src/models/[entity].py
- [ ] T021 [US2] Implementar [Service] em src/services/[service].py
- [ ] T022 [US2] Implementar [endpoint/feature] em src/[location]/[file].py
- [ ] T023 [US2] Integrar com componentes da História de Usuário 1 (se necessário)

**Checkpoint**: Neste ponto, as Histórias de Usuário 1 e 2 devem funcionar independentemente

---

## Fase 5: História de Usuário 3 - [Título] (Prioridade: P3)

**Objetivo**: [Breve descrição do que esta história entrega]

**Teste Independente**: [Como verificar que esta história funciona isoladamente]

### Testes para História de Usuário 3 (OPCIONAL - somente se testes forem solicitados) ⚠️

- [ ] T024 [P] [US3] Teste de contrato para [endpoint] em tests/contract/test_[name].py
- [ ] T025 [P] [US3] Teste de integração para [jornada de usuário] em tests/integration/test_[name].py

### Implementação da História de Usuário 3

- [ ] T026 [P] [US3] Criar modelo [Entity] em src/models/[entity].py
- [ ] T027 [US3] Implementar [Service] em src/services/[service].py
- [ ] T028 [US3] Implementar [endpoint/feature] em src/[location]/[file].py

**Checkpoint**: Todas as histórias de usuário devem estar funcionalmente independentes

---

[Adicione mais fases de histórias de usuário conforme necessário, seguindo o mesmo padrão]

---

## Fase N: Polimento e Preocupações Transversais

**Objetivo**: Melhorias que afetam múltiplas histórias de usuário

- [ ] TXXX [P] Atualizações de documentação em docs/
- [ ] TXXX Limpeza e refatoração de código
- [ ] TXXX Otimização de performance nas histórias
- [ ] TXXX [P] Testes unitários adicionais (se solicitados) em tests/unit/
- [ ] TXXX Reforço de segurança
- [ ] TXXX Validar quickstart.md

---

## Dependências e Ordem de Execução

### Dependências por Fase

- **Setup (Fase 1)**: Sem dependências - pode começar imediatamente
- **Fundacional (Fase 2)**: Depende da conclusão do Setup - BLOQUEIA todas as histórias
- **Histórias de Usuário (Fase 3+)**: Todas dependem da conclusão da fase Fundacional
  - Histórias podem seguir em paralelo (se houver equipe)
  - Ou sequencialmente em ordem de prioridade (P1 → P2 → P3)
- **Polimento (Fase Final)**: Depende de todas as histórias desejadas estarem concluídas

### Dependências por História de Usuário

- **História de Usuário 1 (P1)**: Pode começar após a Fundacional (Fase 2) - sem dependência de outras histórias
- **História de Usuário 2 (P2)**: Pode começar após a Fundacional (Fase 2) - pode integrar com US1, mas deve ser testável independentemente
- **História de Usuário 3 (P3)**: Pode começar após a Fundacional (Fase 2) - pode integrar com US1/US2, mas deve ser testável independentemente

### Dentro de Cada História

- Testes (se incluídos) DEVEM ser escritos e FALHAR antes da implementação
- Modelos antes de serviços
- Serviços antes de endpoints
- Implementação central antes de integração
- História completa antes de avançar para a próxima prioridade

### Oportunidades de Paralelismo

- Todas as tarefas de Setup marcadas com [P] podem rodar em paralelo
- Todas as tarefas Fundacionais marcadas com [P] podem rodar em paralelo (dentro da Fase 2)
- Assim que a fase Fundacional terminar, todas as histórias podem começar em paralelo (se houver capacidade)
- Todos os testes de uma história marcados com [P] podem rodar em paralelo
- Modelos dentro de uma história marcados com [P] podem rodar em paralelo
- Histórias diferentes podem ser trabalhadas em paralelo por pessoas diferentes

---

## Exemplo de Paralelismo: História de Usuário 1

```bash
# Iniciar todos os testes da História de Usuário 1 juntos (se testes forem solicitados):
Task: "Teste de contrato para [endpoint] em tests/contract/test_[name].py"
Task: "Teste de integração para [jornada de usuário] em tests/integration/test_[name].py"

# Iniciar todos os modelos da História de Usuário 1 juntos:
Task: "Criar modelo [Entity1] em src/models/[entity1].py"
Task: "Criar modelo [Entity2] em src/models/[entity2].py"
```

---

## Estratégia de Implementação

### MVP Primeiro (Somente História de Usuário 1)

1. Concluir Fase 1: Setup
2. Concluir Fase 2: Fundacional (CRÍTICO - bloqueia todas as histórias)
3. Concluir Fase 3: História de Usuário 1
4. **PARAR e VALIDAR**: Testar História de Usuário 1 independentemente
5. Publicar/demonstrar se estiver pronta

### Entrega Incremental

1. Concluir Setup + Fundacional → fundação pronta
2. Adicionar História de Usuário 1 → testar independentemente → publicar/demonstrar (MVP!)
3. Adicionar História de Usuário 2 → testar independentemente → publicar/demonstrar
4. Adicionar História de Usuário 3 → testar independentemente → publicar/demonstrar
5. Cada história adiciona valor sem quebrar as anteriores

### Estratégia para Time em Paralelo

Com múltiplos desenvolvedores:

1. Time conclui Setup + Fundacional em conjunto
2. Quando a Fundacional estiver pronta:
   - Pessoa A: História de Usuário 1
   - Pessoa B: História de Usuário 2
   - Pessoa C: História de Usuário 3
3. Histórias concluem e integram de forma independente

---

## Notas

- Tarefas [P] = arquivos diferentes, sem dependências
- Rótulo [Story] mapeia tarefa para história específica, garantindo rastreabilidade
- Cada história deve ser concluível e testável independentemente
- Verifique que testes falham antes de implementar
- Faça commit após cada tarefa ou grupo lógico
- Pare em qualquer checkpoint para validar a história independentemente
- Evite: tarefas vagas, conflitos no mesmo arquivo, dependências cruzadas que quebrem independência
