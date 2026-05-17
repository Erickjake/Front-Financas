# Especificação da Feature: Dashboard Financeiro

**Branch da Feature**: `001-financial-dashboard`  
**Criado em**: 2026-05-01  
**Status**: Rascunho  
**Entrada**: Descrição do usuário: "Criar um dashboard financeiro completo para o Front Finanças, mostrando saldo, receitas, despesas, últimas transações, gastos por categoria e evolução mensal."

## Cenários de Usuário e Testes *(obrigatório)*

### História de Usuário 1 - Visão Geral Financeira (Prioridade: P1)

Como usuário, quero ver um resumo de alto nível da minha situação financeira (saldo, total de receitas e total de despesas) para entender imediatamente meu estado atual.

**Por que esta prioridade**: É o valor central de um dashboard financeiro; entrega percepção imediata de liquidez.

**Teste independente**: Pode ser testado verificando se o saldo exibido corresponde à soma das transações da conta.

**Cenários de Aceitação**:

1. **Dado** que tenho transações no mês atual, **Quando** abro o dashboard, **Então** vejo a soma total de receitas, a soma total de despesas e o saldo atual calculados corretamente.
2. **Dado** que não tenho transações, **Quando** abro o dashboard, **Então** vejo zero para receitas, despesas e saldo.

---

### História de Usuário 2 - Atividade Recente (Prioridade: P1)

Como usuário, quero ver minhas transações mais recentes no dashboard para verificar rapidamente movimentações recentes sem navegar para outra página.

**Por que esta prioridade**: É essencial para acompanhar gastos recentes e detectar erros ou cobranças não autorizadas.

**Teste independente**: Pode ser testado comparando a lista do dashboard com os resultados da API `/transactions`.

**Cenários de Aceitação**:

1. **Dado** que fiz 5 transações recentemente, **Quando** visualizo o dashboard, **Então** vejo essas 5 transações listadas em ordem cronológica decrescente.
2. **Dado** que tenho muitas transações, **Quando** visualizo o dashboard, **Então** ele mostra um conjunto limitado (por exemplo, top 5 ou 10) das mais recentes.

---

### História de Usuário 3 - Análise por Categoria (Prioridade: P2)

Como usuário, quero ver minhas despesas agrupadas por categoria para identificar onde estou gastando mais dinheiro.

**Por que esta prioridade**: Ajuda no planejamento de orçamento e identifica áreas com potencial de economia.

**Teste independente**: Pode ser testado agregando transações por categoria e verificando se os valores batem com a visualização do dashboard.

**Cenários de Aceitação**:

1. **Dado** que tenho despesas em "Alimentação", "Aluguel" e "Lazer", **Quando** visualizo a seção "Gastos por Categoria", **Então** vejo uma representação clara (por exemplo, gráfico ou lista) mostrando o total e o percentual de cada categoria.

---

### História de Usuário 4 - Evolução Mensal (Prioridade: P2)

Como usuário, quero ver um gráfico com a evolução das minhas receitas e despesas nos últimos meses para acompanhar progresso financeiro e tendências.

**Por que esta prioridade**: Entrega perspectiva de longo prazo e ajuda a identificar padrões sazonais.

**Teste independente**: Pode ser testado comparando os pontos do gráfico com os resultados da API de relatório mensal.

**Cenários de Aceitação**:

1. **Dado** que existem dados dos últimos 6 meses, **Quando** visualizo o gráfico de evolução, **Então** vejo barras ou linhas representando receitas e despesas de cada mês corretamente.

### Casos de Borda

- **Sem dados**: Como o dashboard aparece para um usuário novo? Deve mostrar estados vazios ou instruções.
- **Valores altos**: Como valores muito altos (por exemplo, milhões) são exibidos nos cards de resumo? Devem usar formatação adequada e abreviações se necessário.
- **Falha de API**: Como o dashboard lida com timeout ou erro do backend? Deve mostrar mensagem amigável e botão de tentar novamente.

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **FR-001**: O sistema DEVE exibir total de receitas, total de despesas e saldo atual em cards de resumo com alta visibilidade.
- **FR-002**: O sistema DEVE listar as 5 transações mais recentes com descrição, valor, categoria e data.
- **FR-003**: O sistema DEVE fornecer uma visualização (por exemplo, gráfico Donut/Pizza) de gastos por categoria para o mês atual.
- **FR-004**: O sistema DEVE fornecer uma visualização (por exemplo, gráfico de barras) mostrando a evolução mensal de receitas e despesas.
- **FR-005**: O sistema DEVE permitir que o usuário selecione o período dos dados do dashboard usando intervalos predefinidos (por exemplo, últimos 7 dias, mês atual, últimos 3 meses).
- **FR-006**: O dashboard DEVE atualizar os dados quando o usuário voltar para ele.

### Entidades Principais *(inclua se a feature envolver dados)*

- **DashboardSummary**: Representa os totais calculados (saldo, receitas, despesas).
- **Transaction**: Representa uma movimentação financeira individual (valor, categoria, data, tipo).
- **CategorySpend**: Representa uma agregação de transações por categoria.
- **MonthlyData**: Representa as receitas e despesas agregadas de um mês específico.

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **SC-001**: O dashboard carrega e renderiza todos os componentes (gráficos e listas) em menos de 1,5 segundo em uma conexão 4G padrão.
- **SC-002**: Usuários conseguem identificar o saldo atual em até 3 segundos após o carregamento da página.
- **SC-003**: Os dados exibidos no dashboard são 100% consistentes com as visões detalhadas de transações e relatórios.
- **SC-004**: 100% dos gráficos oferecem alternativas acessíveis (por exemplo, `aria-labels` ou tooltips) para leitores de tela.

## Premissas

- **Foco no mês atual**: Por padrão, o dashboard mostra dados do mês calendário atual, a menos que um filtro seja aplicado.
- **Moeda**: Todos os valores são exibidos na moeda local do usuário, com padrão BRL conforme o contexto do projeto.
- **Disponibilidade da API**: Os endpoints existentes (`/reports/*` e `/transactions`) fornecem todos os dados necessários para o dashboard.
- **Layout**: O dashboard é a página principal após o login.
- **Componentes**: Serão usados `lucide-react` para ícones e componentes de `src/components/ui` (shadcn/ui).
