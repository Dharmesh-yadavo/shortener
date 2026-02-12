// lib/stripe.ts
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing from .env.local");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Use the latest API version or a specific one compatible with your project
  apiVersion: "2026-01-28.clover",
  typescript: true,
  appInfo: {
    name: "shortener-io",
    version: "1.0.0",
  },
});
