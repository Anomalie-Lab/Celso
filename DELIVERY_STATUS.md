# 📦 Status de Entrega - Medicine Shop

## Enum DeliveryStatus

### 🚀 Status Inicial
- **PENDING** - Pedido pendente
- **CONFIRMED** - Pedido confirmado

### ⚙️ Status de Processamento
- **PROCESSING** - Em processamento
- **PREPARING** - Preparando pedido
- **PACKAGED** - Embalado
- **READY_FOR_SHIPPING** - Pronto para envio

### 📤 Status de Envio
- **SHIPPED** - Enviado
- **IN_TRANSIT** - Em trânsito
- **OUT_FOR_DELIVERY** - Saiu para entrega

### 📥 Status de Entrega
- **DELIVERED** - Entregue
- **RECEIVED** - Recebido
- **COMPLETED** - Concluído

### ⚠️ Status de Problemas
- **DELAYED** - Atrasado
- **RETURNED** - Devolvido
- **FAILED_DELIVERY** - Falha na entrega
- **CANCELLED** - Cancelado

### 🏪 Status Específicos de Empresas
- **PICKUP_AVAILABLE** - Disponível para retirada
- **AT_PICKUP_POINT** - No ponto de retirada
- **SCHEDULED_DELIVERY** - Entrega agendada
- **RESCHEDULED** - Reagendado
- **ATTEMPTED_DELIVERY** - Tentativa de entrega

## 📋 Fluxo Típico de Entrega

```
PENDING → CONFIRMED → PROCESSING → PREPARING → PACKAGED → 
READY_FOR_SHIPPING → SHIPPED → IN_TRANSIT → OUT_FOR_DELIVERY → 
DELIVERED → RECEIVED → COMPLETED
```

## 🚚 Empresas de Entrega Suportadas

### Correios
- PENDING → CONFIRMED → PROCESSING → SHIPPED → IN_TRANSIT → DELIVERED

### Mercado Livre
- PENDING → CONFIRMED → PROCESSING → PREPARING → PACKAGED → SHIPPED → IN_TRANSIT → OUT_FOR_DELIVERY → DELIVERED

### Amazon
- PENDING → CONFIRMED → PROCESSING → PREPARING → PACKAGED → READY_FOR_SHIPPING → SHIPPED → IN_TRANSIT → OUT_FOR_DELIVERY → DELIVERED

### iFood
- PENDING → CONFIRMED → PROCESSING → PREPARING → PACKAGED → OUT_FOR_DELIVERY → DELIVERED

### Uber Eats
- PENDING → CONFIRMED → PROCESSING → PREPARING → PACKAGED → OUT_FOR_DELIVERY → DELIVERED

### Rappi
- PENDING → CONFIRMED → PROCESSING → PREPARING → PACKAGED → OUT_FOR_DELIVERY → DELIVERED

## 🎨 Cores por Status

### Status Positivos (Verde)
- `DELIVERED`, `RECEIVED`, `COMPLETED` - #10B981

### Status Neutros (Azul)
- `PENDING`, `CONFIRMED`, `PROCESSING`, `PREPARING`, `PACKAGED`, `READY_FOR_SHIPPING`, `SHIPPED`, `IN_TRANSIT`, `OUT_FOR_DELIVERY` - #3B82F6

### Status de Aviso (Amarelo)
- `DELAYED`, `RESCHEDULED`, `ATTEMPTED_DELIVERY` - #F59E0B

### Status Negativos (Vermelho)
- `RETURNED`, `FAILED_DELIVERY`, `CANCELLED` - #DC2626

### Status Especiais (Roxo)
- `PICKUP_AVAILABLE`, `AT_PICKUP_POINT`, `SCHEDULED_DELIVERY` - #8B5CF6

## 📧 Templates de Email

Cada status pode ter um template de email específico:

- **PENDING** → Email de confirmação do pedido
- **CONFIRMED** → Email de confirmação de pagamento
- **PROCESSING** → Email de processamento iniciado
- **PREPARING** → Email de preparação do pedido
- **PACKAGED** → Email de embalagem concluída
- **READY_FOR_SHIPPING** → Email de pronto para envio
- **SHIPPED** → Email de pedido enviado
- **IN_TRANSIT** → Email de pedido em trânsito
- **OUT_FOR_DELIVERY** → Email de saída para entrega
- **DELIVERED** → Email de entrega realizada
- **RECEIVED** → Email de confirmação de recebimento
- **COMPLETED** → Email de conclusão do pedido
- **DELAYED** → Email de atraso na entrega
- **RETURNED** → Email de devolução
- **FAILED_DELIVERY** → Email de falha na entrega
- **CANCELLED** → Email de cancelamento
- **PICKUP_AVAILABLE** → Email de disponível para retirada
- **AT_PICKUP_POINT** → Email de chegada no ponto de retirada
- **SCHEDULED_DELIVERY** → Email de entrega agendada
- **RESCHEDULED** → Email de reagendamento
- **ATTEMPTED_DELIVERY** → Email de tentativa de entrega

## 🔧 Implementação

```typescript
// Exemplo de uso no serviço de entrega
enum DeliveryStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  PREPARING = 'PREPARING',
  PACKAGED = 'PACKAGED',
  READY_FOR_SHIPPING = 'READY_FOR_SHIPPING',
  SHIPPED = 'SHIPPED',
  IN_TRANSIT = 'IN_TRANSIT',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  RECEIVED = 'RECEIVED',
  COMPLETED = 'COMPLETED',
  DELAYED = 'DELAYED',
  RETURNED = 'RETURNED',
  FAILED_DELIVERY = 'FAILED_DELIVERY',
  CANCELLED = 'CANCELLED',
  PICKUP_AVAILABLE = 'PICKUP_AVAILABLE',
  AT_PICKUP_POINT = 'AT_PICKUP_POINT',
  SCHEDULED_DELIVERY = 'SCHEDULED_DELIVERY',
  RESCHEDULED = 'RESCHEDULED',
  ATTEMPTED_DELIVERY = 'ATTEMPTED_DELIVERY'
}
```
