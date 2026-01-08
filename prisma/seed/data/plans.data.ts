export const PLANS = [
  {
    key: "starter",
    active: true,
    stripeProductId: process.env.STRIPE_PRODUCT_ID_STARTER,
    translations: {
      "pt-BR": {
        title: "Iniciante",
        subtitle: "Para quem está começando",
        description: "Plano básico para montar sua primeira loja.",
      },
      "en-US": {
        title: "Starter",
        subtitle: "For getting started",
        description: "Basic plan to create your first store.",
      },
    },
    prices: [
      {
        amountCents: 4900,
        currency: "BRL",
        interval: "MONTH",
        stripePriceId: process.env.STRIPE_PRICE_ID_STARTER_MONTH,
        active: true,
      },
      {
        amountCents: 46800,
        currency: "BRL",
        interval: "YEAR",
        stripePriceId: process.env.STRIPE_PRICE_ID_STARTER_YEAR,
        active: true,
      },
      {
        amountCents: 1600,
        currency: "USD",
        interval: "MONTH",
        stripePriceId: undefined,
        active: true,
      },
      {
        amountCents: 14400,
        currency: "USD",
        interval: "YEAR",
        stripePriceId: undefined,
        active: true,
      },
    ],
  },
  {
    key: "pro",
    active: true,
    stripeProductId: process.env.STRIPE_PRODUCT_ID_PRO,
    translations: {
      "pt-BR": {
        title: "Profissional",
        subtitle: "Para negócios em crescimento",
        description:
          "Plano completo com recursos avançados para expandir suas vendas.",
      },
      "en-US": {
        title: "Professional",
        subtitle: "For growing businesses",
        description:
          "Complete plan with advanced features to expand your sales.",
      },
    },
    prices: [
      {
        amountCents: 10000,
        currency: "BRL",
        interval: "MONTH",
        stripePriceId: process.env.STRIPE_PRICE_ID_PRO_MONTH,
        active: true,
      },
      {
        amountCents: 108000,
        currency: "BRL",
        interval: "YEAR",
        stripePriceId: process.env.STRIPE_PRICE_ID_PRO_YEAR,
        active: true,
      },
      {
        amountCents: 3800,
        currency: "USD",
        interval: "MONTH",
        stripePriceId: undefined,
        active: true,
      },
      {
        amountCents: 38400,
        currency: "USD",
        interval: "YEAR",
        stripePriceId: undefined,
        active: true,
      },
    ],
  },
  {
    key: "business",
    active: true,
    stripeProductId: process.env.STRIPE_PRODUCT_ID_BUSINESS,
    translations: {
      "pt-BR": {
        title: "Negócios",
        subtitle: "Para grandes operações",
        description:
          "Solução completa sem limites, com suporte prioritário e recursos exclusivos.",
      },
      "en-US": {
        title: "Business",
        subtitle: "For large operations",
        description:
          "Complete solution without limits, with priority support and exclusive features.",
      },
    },
    prices: [
      {
        amountCents: 20000,
        currency: "BRL",
        interval: "MONTH",
        stripePriceId: process.env.STRIPE_PRICE_ID_BUSINESS_MONTH,
        active: true,
      },
      {
        amountCents: 216000,
        currency: "BRL",
        interval: "YEAR",
        stripePriceId: process.env.STRIPE_PRICE_ID_BUSINESS_YEAR,
        active: true,
      },
      {
        amountCents: 7600,
        currency: "USD",
        interval: "MONTH",
        stripePriceId: undefined,
        active: true,
      },
      {
        amountCents: 74400,
        currency: "USD",
        interval: "YEAR",
        stripePriceId: undefined,
        active: true,
      },
    ],
  },
] as const;
