import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

// Mapping your Stripe Product IDs to your DB Enum
const PLAN_MAP: Record<string, "pro" | "business"> = {
  prod_Txse8rSKPx2ug9: "pro",
  prod_TxsfMUBLvA8NJg: "business",
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
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  // Handle successful subscription
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    // We expand line_items to see exactly what product was bought
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items.data.price.product"],
    });

    const productId = fullSession.line_items?.data[0]?.price?.product;
    const productIdString =
      typeof productId === "string"
        ? productId
        : (productId as Stripe.Product)?.id;

    const planToSet = PLAN_MAP[productIdString];

    if (userId && planToSet) {
      await db
        .update(users)
        .set({
          plan: planToSet,
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string, // Added this!
        })
        .where(eq(users.id, Number(userId)));

      console.log(`✅ User ${userId} upgraded to ${planToSet}`);
    }
  }

  // Handle cancellations (Optional but recommended)
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;

    await db
      .update(users)
      .set({ plan: "free", stripeSubscriptionId: null })
      .where(eq(users.stripeSubscriptionId, subscription.id));

    console.log(
      `❌ Subscription ${subscription.id} cancelled. User reverted to Free.`,
    );
  }

  return new Response("Webhook Handled", { status: 200 });
}
