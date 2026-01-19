/*
import { prisma, stripe } from "@/app/_lib";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.log("⚠️  Webhook signature verification failed.", err);
    return new Response(`Webhook Error`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    if (!session.metadata?.tenantId) {
      return new Response("Missing tenantId in metadata", { status: 400 });
    }

    const planPrice = await prisma.planPrice.findUnique({
      where: { stripePriceId: subscription.items.data[0].price.id },
      include: { plan: true },
    });

    if (!planPrice || !planPrice.plan) {
      return new Response("Plan not found", { status: 400 });
    }

    const plan = planPrice.plan;

    await prisma.tenant.update({
      where: { id: session.metadata.tenantId },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId:
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id,
        subscriptionStatus: subscription.status,
        isActive: true,
        plan: {
          connect: { id: plan.id },
        },
      },
    });
  }

  if (
    event.type === "customer.subscription.deleted" ||
    event.type === "customer.subscription.updated"
  ) {
    const subscription = event.data.object;
    await prisma.tenant.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        subscriptionStatus: subscription.status,
        isActive: subscription.status === "active",
      },
    });
  }

  return new Response(null, { status: 200 });
}
*/
