import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

// 1. Map to PRICE IDs (more reliable)
const PLAN_MAP: Record<string, "pro" | "business"> = {
  price_1SzwtQIXXAX38UQrFhshyIaB: "pro",
  price_1SzwttIXXAX38UQrXcdksKRn: "business",
};

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error(err);
    return new Response(`Webhook Error`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (!session.subscription)
        return new Response("No subscription", { status: 400 });

      // Cast to Stripe.Subscription to avoid the "Response<Subscription>" error
      const subscription = (await stripe.subscriptions.retrieve(
        session.subscription as string,
      )) as Stripe.Subscription;

      const priceId = subscription.items.data[0].price.id;
      const planToSet = PLAN_MAP[priceId];

      // Use the path confirmed by your JSON log
      const rawExpiry = subscription.items.data[0].current_period_end || "";

      const planExpiresAt = rawExpiry ? new Date(rawExpiry * 1000) : null;

      if (userId && planToSet) {
        await db
          .update(users)
          .set({
            plan: planToSet,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscription.id,
            planExpiresAt: planExpiresAt,
          })
          .where(eq(users.id, Number(userId)));

        // console.log(`⭐ Success: User ${userId} is now ${planToSet}`);
      } else {
        console.error("❌ Missing userId or plan mapping. Check metadata!");
      }
      break;
    }

    case "customer.subscription.deleted":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const status = subscription.status;

      const plan =
        status === "active" || status === "trialing"
          ? PLAN_MAP[subscription.items.data[0].price.id]
          : "free";

      const rawExpiry = subscription.items.data[0].current_period_end || "";
      const planExpiresAt = rawExpiry ? new Date(rawExpiry * 1000) : null;

      await db
        .update(users)
        .set({
          plan: plan ?? "free",
          stripeSubscriptionId: status === "canceled" ? null : subscription.id,
          planExpiresAt: planExpiresAt,
        })
        .where(eq(users.stripeSubscriptionId, subscription.id));
      break;
    }
  }

  return new Response("Webhook Handled", { status: 200 });
}
