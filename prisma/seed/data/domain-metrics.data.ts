export const DOMAIN_METRICS = [
  {
    key: "total_revenue",
    namespace: "business",
    value: "1250000.50",
    unit: "BRL",
    meta: {
      period: "2026-01",
      description: "Receita total do mês",
    },
  },
  {
    key: "active_tenants",
    namespace: "business",
    value: "523",
    unit: "count",
    meta: {
      description: "Total de tenants ativos na plataforma",
    },
  },
  {
    key: "total_stores",
    namespace: "business",
    value: "847",
    unit: "count",
    meta: {
      description: "Total de lojas criadas",
    },
  },
  {
    key: "total_orders",
    namespace: "business",
    value: "15847",
    unit: "count",
    meta: {
      period: "2026-01",
      description: "Total de pedidos processados no mês",
    },
  },
  {
    key: "conversion_rate",
    namespace: "business",
    value: "3.45",
    unit: "percentage",
    meta: {
      period: "2026-01",
      description: "Taxa de conversão média",
    },
  },
  {
    key: "avg_response_time",
    namespace: "performance",
    value: "145.50",
    unit: "ms",
    meta: {
      description: "Tempo médio de resposta da API",
    },
  },
  {
    key: "uptime",
    namespace: "performance",
    value: "99.98",
    unit: "percentage",
    meta: {
      period: "2026-01",
      description: "Uptime da plataforma",
    },
  },
  {
    key: "database_size",
    namespace: "performance",
    value: "125.75",
    unit: "GB",
    meta: {
      description: "Tamanho total do banco de dados",
    },
  },
  {
    key: "subscribers_count",
    namespace: "plan:starter",
    value: "312",
    unit: "count",
    meta: {
      description: "Total de assinantes do plano Starter",
    },
  },
  {
    key: "subscribers_count",
    namespace: "plan:pro",
    value: "168",
    unit: "count",
    meta: {
      description: "Total de assinantes do plano Pro",
    },
  },
  {
    key: "subscribers_count",
    namespace: "plan:business",
    value: "43",
    unit: "count",
    meta: {
      description: "Total de assinantes do plano Business",
    },
  },
  {
    key: "monthly_revenue",
    namespace: "plan:starter",
    value: "152880.00",
    unit: "BRL",
    meta: {
      period: "2026-01",
      description: "Receita mensal do plano Starter",
    },
  },
  {
    key: "monthly_revenue",
    namespace: "plan:pro",
    value: "166320.00",
    unit: "BRL",
    meta: {
      period: "2026-01",
      description: "Receita mensal do plano Pro",
    },
  },
  {
    key: "monthly_revenue",
    namespace: "plan:business",
    value: "855700.00",
    unit: "BRL",
    meta: {
      period: "2026-01",
      description: "Receita mensal do plano Business",
    },
  },
  {
    key: "total_users",
    namespace: "users",
    value: "8547",
    unit: "count",
    meta: {
      description: "Total de usuários cadastrados",
    },
  },
  {
    key: "active_users",
    namespace: "users",
    value: "6234",
    unit: "count",
    meta: {
      period: "2026-01",
      description: "Usuários ativos no mês",
    },
  },
  {
    key: "new_users",
    namespace: "users",
    value: "432",
    unit: "count",
    meta: {
      period: "2026-01",
      description: "Novos usuários no mês",
    },
  },
  {
    key: "total_products",
    namespace: "products",
    value: "45623",
    unit: "count",
    meta: {
      description: "Total de produtos cadastrados",
    },
  },
  {
    key: "avg_products_per_store",
    namespace: "products",
    value: "53.87",
    unit: "count",
    meta: {
      description: "Média de produtos por loja",
    },
  },
  {
    key: "support_tickets",
    namespace: "support",
    value: "234",
    unit: "count",
    meta: {
      period: "2026-01",
      description: "Total de tickets de suporte",
    },
  },
  {
    key: "avg_resolution_time",
    namespace: "support",
    value: "4.5",
    unit: "hours",
    meta: {
      period: "2026-01",
      description: "Tempo médio de resolução",
    },
  },
  {
    key: "satisfaction_score",
    namespace: "support",
    value: "4.8",
    unit: "score",
    meta: {
      period: "2026-01",
      description: "Nota média de satisfação (de 5)",
    },
  },
] as const;
