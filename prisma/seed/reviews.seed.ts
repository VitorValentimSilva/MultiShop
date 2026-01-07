import { prisma } from "@/app/_lib/prisma";
import { REVIEWS } from "@/prisma/seed/data/reviews.data";

export async function seedReviews() {
  console.log("🌱 Seeding reviews...");

  for (const r of REVIEWS) {
    const plan = r.planKey
      ? await prisma.plan.findUnique({ where: { key: r.planKey } })
      : null;
    const exists = await prisma.review.findFirst({
      where: {
        title: r.title,
        authorName: r.authorName,
        planId: plan?.id ?? null,
      },
    });
    if (!exists) {
      await prisma.review.create({
        data: {
          rating: r.rating,
          title: r.title ?? null,
          message: r.message ?? null,
          authorName: r.authorName ?? null,
          authorEmail: r.authorEmail ?? null,
          isPublished: r.isPublished,
          planId: plan?.id ?? null,
          locale: r.locale ?? null,
        },
      });
    }
  }
  console.log("✅ Reviews seed completed.");
}
