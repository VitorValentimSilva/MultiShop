"use server";

import { prisma, stripe } from "@/app/_lib";
import { redirect } from "next/navigation";

export async function createCheckoutSession(priceId: string, tenantId: string) {
  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });

  const session = await stripe.checkout.sessions.create({
    customer: tenant?.stripeCustomerId || undefined,
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    metadata: {
      tenantId: tenantId,
    },
  });

  if (session.url) {
    redirect(session.url);
  }
}
