# Especificação da Feature: [FEATURE NAME]

**Branch da Feature**: `[###-feature-name]`  
**Criado em**: [DATE]  
**Status**: Rascunho  
**Entrada**: Descrição do usuário: "$ARGUMENTS"

## Cenários de Usuário e Testes *(obrigatório)*

<!--
  IMPORTANTE: As histórias de usuário devem ser PRIORIZADAS como jornadas ordenadas por importância.
  Cada história/jornada deve ser TESTÁVEL DE FORMA INDEPENDENTE: se apenas uma história for implementada,
  ela ainda deve entregar um MVP (Minimum Viable Product) com valor real.

  Atribua prioridades (P1, P2, P3 etc.), em que P1 é a mais crítica.
  Pense em cada história como uma fatia independente de funcionalidade que pode ser:
  - Desenvolvida independentemente
  - Testada independentemente
  - Publicada independentemente
  - Demonstrada aos usuários independentemente
-->

### História de Usuário 1 - [Título breve] (Prioridade: P1)

[Descreva esta jornada em linguagem simples]

**Por que esta prioridade**: [Explique o valor e por que tem este nível de prioridade]

**Teste independente**: [Descreva como isso pode ser testado de forma independente, por exemplo: "Pode ser testado completamente por [ação específica] e entrega [valor específico]"]

**Cenários de Aceitação**:

1. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]
2. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]

---

### História de Usuário 2 - [Título breve] (Prioridade: P2)

[Descreva esta jornada em linguagem simples]

**Por que esta prioridade**: [Explique o valor e por que tem este nível de prioridade]

**Teste independente**: [Descreva como isso pode ser testado de forma independente]

**Cenários de Aceitação**:

1. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]

---

### História de Usuário 3 - [Título breve] (Prioridade: P3)

[Descreva esta jornada em linguagem simples]

**Por que esta prioridade**: [Explique o valor e por que tem este nível de prioridade]

**Teste independente**: [Descreva como isso pode ser testado de forma independente]

**Cenários de Aceitação**:

1. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]

---

[Adicione mais histórias de usuário conforme necessário, cada uma com prioridade definida]

### Casos de Borda

<!--
  AÇÃO NECESSÁRIA: O conteúdo desta seção contém placeholders.
  Preencha com os casos de borda corretos.
-->

- O que acontece quando [condição limite]?
- Como o sistema lida com [cenário de erro]?

## Requisitos *(obrigatório)*

<!--
  AÇÃO NECESSÁRIA: O conteúdo desta seção contém placeholders.
  Preencha com os requisitos funcionais corretos.
-->

### Requisitos Funcionais

- **FR-001**: O sistema DEVE [capacidade específica, por exemplo: "permitir que usuários criem contas"]
- **FR-002**: O sistema DEVE [capacidade específica, por exemplo: "validar endereços de email"]  
- **FR-003**: Usuários DEVEM poder [interação principal, por exemplo: "redefinir a senha"]
- **FR-004**: O sistema DEVE [requisito de dados, por exemplo: "persistir preferências do usuário"]
- **FR-005**: O sistema DEVE [comportamento, por exemplo: "registrar todos os eventos de segurança"]

*Exemplo de requisito com dúvida aberta:*

- **FR-006**: O sistema DEVE autenticar usuários via [NEEDS CLARIFICATION: método de autenticação não especificado - email/senha, SSO, OAuth?]
- **FR-007**: O sistema DEVE reter dados de usuário por [NEEDS CLARIFICATION: período de retenção não especificado]

### Entidades Principais *(inclua se a feature envolver dados)*

- **[Entidade 1]**: [O que representa, atributos principais sem detalhes de implementação]
- **[Entidade 2]**: [O que representa, relacionamentos com outras entidades]

## Critérios de Sucesso *(obrigatório)*

<!--
  AÇÃO NECESSÁRIA: Defina critérios de sucesso mensuráveis.
  Eles devem ser mensuráveis e independentes de tecnologia.
-->

### Resultados Mensuráveis

- **SC-001**: [Métrica mensurável, por exemplo: "Usuários conseguem concluir o cadastro em menos de 2 minutos"]
- **SC-002**: [Métrica mensurável, por exemplo: "O sistema suporta 1000 usuários simultâneos sem degradação"]
- **SC-003**: [Métrica de satisfação, por exemplo: "90% dos usuários concluem a tarefa principal na primeira tentativa"]
- **SC-004**: [Métrica de negócio, por exemplo: "Reduzir chamados de suporte relacionados a [X] em 50%"]

## Premissas

<!--
  AÇÃO NECESSÁRIA: O conteúdo desta seção contém placeholders.
  Preencha com premissas apropriadas com base em padrões razoáveis escolhidos
  quando a descrição da feature não especificar certos detalhes.
-->

- [Premissa sobre usuários-alvo, por exemplo: "Usuários têm conexão estável com a internet"]
- [Premissa sobre limites de escopo, por exemplo: "Suporte mobile está fora do escopo da v1"]
- [Premissa sobre dados/ambiente, por exemplo: "O sistema de autenticação existente será reutilizado"]
- [Dependência de sistema/serviço existente, por exemplo: "Requer acesso à API de perfil de usuário existente"]
