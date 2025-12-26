import { prisma } from "@/app/_lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

type SimpleFeature = {
  key: string;
  name: string;
  description?: string;
  order?: number;
};

type SimplePlan = {
  key: string;
  title: string;
  subtitle?: string;
  description?: string;
  priceCents?: number | null;
  currency?: string | null;
  interval?: "MONTH" | "YEAR" | "ONE_TIME";
  active?: boolean;
  stripeProductId?: string | null;
  stripePriceId?: string | null;
};

export async function seedDomain() {
  console.log(
    "🌱 Seeding domain models: Features, Plans, PlanFeatures, Reviews, DomainMetric...",
  );

  const featuresData: SimpleFeature[] = [
    {
      key: "unlimited-products",
      name: "Produtos ilimitados",
      description: "Adicione quantos produtos quiser",
      order: 10,
    },
    {
      key: "custom-domain",
      name: "Domínio personalizado",
      description: "Use seu próprio domínio",
      order: 20,
    },
    {
      key: "multi-store",
      name: "Múltiplas lojas",
      description: "Gerencie múltiplas lojas a partir de um painel",
      order: 30,
    },
    {
      key: "analytics",
      name: "Analytics",
      description: "Relatórios e métricas de vendas",
      order: 40,
    },
    {
      key: "priority-support",
      name: "Suporte prioritário",
      description: "Atendimento com prioridade",
      order: 50,
    },
  ];

  const createdFeatures: Record<string, Prisma.FeatureCreateArgs["data"]> = {};
  for (const f of featuresData) {
    const feat = await prisma.feature.upsert({
      where: { key: f.key },
      update: {
        name: f.name,
        description: f.description ?? null,
        order: f.order ?? null,
      },
      create: {
        key: f.key,
        name: f.name,
        description: f.description ?? null,
        order: f.order ?? null,
      },
    });
    createdFeatures[feat.key] = feat;
  }

  const plansData: SimplePlan[] = [
    {
      key: "starter",
      title: "Starter",
      subtitle: "Para quem está começando",
      description: "Plano básico para montar sua primeira loja.",
      priceCents: 49,
      currency: "BRL",
      interval: "MONTH",
      active: true,
      stripeProductId: "prod_Tg4UIuttp0fWTk",
      stripePriceId: "price_1SiiLdRh7W2vWnF6Myr7sFjL",
    },
    {
      key: "pro",
      title: "Pro",
      subtitle: "Cresça seu negócio",
      description: "Recursos avançados para lojas em crescimento.",
      priceCents: 149,
      currency: "BRL",
      interval: "MONTH",
      active: true,
      stripeProductId: "prod_Tg4UrCIsiwwwPj",
      stripePriceId: "price_1SiiLDRh7W2vWnF6VOBVQAfI",
    },
    {
      key: "business",
      title: "Business",
      subtitle: "Para empresas",
      description: "Tudo do Pro + funcionalidades empresariais.",
      priceCents: 399,
      currency: "BRL",
      interval: "MONTH",
      active: true,
      stripeProductId: "prod_Tg3kXYOWEdYj1I",
      stripePriceId: "price_1SihdDRh7W2vWnF6MtZZXqKY",
    },
  ];

  const createdPlans: Record<string, Prisma.PlanCreateArgs["data"]> = {};
  for (const p of plansData) {
    const plan = await prisma.plan.upsert({
      where: { key: p.key },
      update: {
        title: p.title,
        priceCents: p.priceCents,
        stripeProductId: p.stripeProductId,
        stripePriceId: p.stripePriceId,
      },
      create: p,
    });
    createdPlans[plan.key] = plan;
  }

  const planFeatureSpecs = [
    {
      planKey: "starter",
      featureKeys: ["unlimited-products", "custom-domain"],
    },
    {
      planKey: "pro",
      featureKeys: [
        "unlimited-products",
        "custom-domain",
        "analytics",
        "multi-store",
      ],
    },
    {
      planKey: "business",
      featureKeys: [
        "unlimited-products",
        "custom-domain",
        "analytics",
        "multi-store",
        "priority-support",
      ],
    },
  ];

  for (const pf of planFeatureSpecs) {
    const plan = createdPlans[pf.planKey];
    if (!plan || !plan.id) continue;
    for (const fk of pf.featureKeys) {
      const feature = createdFeatures[fk];
      if (!feature || !feature.id) continue;

      const exists = await prisma.planFeature.findUnique({
        where: {
          planId_featureId: {
            planId: plan.id,
            featureId: feature.id,
          },
        } as Prisma.PlanFeatureWhereUniqueInput,
      });

      if (!exists) {
        await prisma.planFeature.create({
          data: {
            planId: plan.id,
            featureId: feature.id,
            included: true,
            note: null,
          } as Prisma.PlanFeatureCreateArgs["data"],
        });
      } else {
        await prisma.planFeature.update({
          where: {
            planId_featureId: {
              planId: plan.id,
              featureId: feature.id,
            },
          },
          data: { included: true } as Prisma.PlanFeatureUpdateArgs["data"],
        });
      }
    }
  }

  const reviewsData = [
    {
      rating: 5,
      title: "Ótimo para começar",
      message: "Usei o Starter para abrir minha loja e adorei a simplicidade.",
      authorName: "Maria Silva",
      authorEmail: null,
      isPublished: true,
      planKey: "starter",
    },
    {
      rating: 5,
      title: "Recursos avançados",
      message: "O plano Pro trouxe relatórios que ajudaram muito nas decisões.",
      authorName: "Loja Exemplo",
      authorEmail: null,
      isPublished: true,
      planKey: "pro",
    },
    {
      rating: 4,
      title: "Ótimo suporte",
      message: "Atendimento rápido no plano Business. Recomendo.",
      authorName: "Carlos",
      authorEmail: null,
      isPublished: true,
      planKey: "business",
    },
    {
      rating: 5,
      title: "O MultiShop é incrível",
      message: "Plataforma completa para gerenciar várias lojas.",
      authorName: "Equipe MultiShop",
      authorEmail: null,
      isPublished: true,
      planKey: null,
    },
  ];

  for (const r of reviewsData) {
    const planId = r.planKey ? (createdPlans[r.planKey]?.id ?? null) : null;
    const exists = await prisma.review.findFirst({
      where: {
        title: r.title,
        authorName: r.authorName,
        planId: planId,
      },
    });
    if (!exists) {
      await prisma.review.create({
        data: {
          rating: r.rating,
          title: r.title,
          message: r.message ?? null,
          authorName: r.authorName ?? null,
          authorEmail: r.authorEmail ?? null,
          isPublished: r.isPublished ?? true,
          planId: planId ?? null,
        },
      });
    }
  }

  const metrics = [
    {
      key: "total_shops_created",
      namespace: "multishop",
      value: new Prisma.Decimal(12),
      unit: "count",
      meta: { note: "seed initial" },
    },
    {
      key: "orders_processed",
      namespace: "multishop",
      value: new Prisma.Decimal(345),
      unit: "count",
      meta: { note: "seed initial" },
    },
    {
      key: "total_revenue_cents",
      namespace: "payments",
      value: new Prisma.Decimal(1234567),
      unit: "cents",
      meta: { currency: "BRL" },
    },
  ];

  for (const m of metrics) {
    const exists = await prisma.domainMetric.findFirst({
      where: {
        key: m.key,
        namespace: m.namespace ?? null,
      },
    });

    if (!exists) {
      await prisma.domainMetric.create({
        data: {
          key: m.key,
          namespace: m.namespace ?? null,
          value: m.value,
          unit: m.unit ?? null,
          meta: m.meta ?? null,
        },
      });
    } else {
      await prisma.domainMetric.update({
        where: { id: exists.id },
        data: {
          value: m.value,
          unit: m.unit ?? null,
          meta: m.meta ?? null,
        },
      });
    }
  }

  console.log("✅ Domain seed completed.");
}
