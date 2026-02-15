// app/actions/stripe.ts
"use server";

import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function createCheckoutSession(
  userId: number,
  email: string,
  priceId: string,
) {
  const origin = (await headers()).get("origin");

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${origin}/dashboard?payment=success`,
    cancel_url: `${origin}/dashboard?payment=canceled`,
    metadata: { userId: userId.toString() },
  });

  redirect(session.url!);
}

export async function createCustomerPortalSession(customerId: string) {
  const origin = (await headers()).get("origin");

  if (!customerId) {
    throw new Error("User does not have a Stripe Customer ID");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/dashboard/settings`, // Where they go after closing the portal
  });

  redirect(session.url);
}
