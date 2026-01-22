import { createLogger } from "@/core/lib";
import { prismaSeedClient } from "@/core/database/prisma-seed-client";
import { REVIEWS } from "@/seed/data";

const log = createLogger({ scope: "seed", seed: "reviews" });

// * Resolves a plan by its key
// ? Returns null if the plan key is undefined or not found
async function resolvePlanByKey(planKey?: string | null) {
  if (!planKey) {
    return null;
  }

  const plan = await prismaSeedClient.plan.findUnique({
    where: { key: planKey },
  });

  // ! Review can still be created even if the plan does not exist
  if (!plan) {
    log.warn(`⚠️  Plan '${planKey}' not found, seeding review as plan=null`);
  }

  return plan;
}

// * Builds the review payload based on static seed data
function buildReviewData(r: (typeof REVIEWS)[number], planId: string | null) {
  return {
    rating: r.rating,
    title: r.title ?? null,
    message: r.message ?? null,
    authorName: r.authorName ?? null,
    authorEmail: r.authorEmail ?? null,
    isPublished: r.isPublished,
    planId,
    locale: r.locale ?? null,
  };
}

// * Creates or updates a review
// * Uses a soft uniqueness check based on title, author and plan
async function upsertReview(r: (typeof REVIEWS)[number]) {
  const plan = await resolvePlanByKey(r.planKey);
  const planId = plan?.id ?? null;

  // * Check if a similar review already exists
  const exists = await prismaSeedClient.review.findFirst({
    where: {
      title: r.title,
      authorName: r.authorName,
      planId,
    },
  });

  const data = buildReviewData(r, planId);

  // * Create review if it does not exist
  if (!exists) {
    await prismaSeedClient.review.create({ data });
    return;
  }

  // * Update existing review
  await prismaSeedClient.review.update({
    where: { id: exists.id },
    data,
  });
}

// * Seeds all reviews defined in static data
async function seedAllReviews() {
  for (const r of REVIEWS) {
    await upsertReview(r);
  }
}

// * Entry point for reviews seeding
export async function seedReviews() {
  log.warn("🌱 Seeding reviews...");

  await seedAllReviews();

  log.warn("✅ Reviews seed completed.");
}
