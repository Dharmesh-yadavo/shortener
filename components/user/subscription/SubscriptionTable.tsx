"use client";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/server/subscription/action.stripe";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    priceId: null,
    features: ["5 Links", "5 QRs"],
  },
  {
    name: "Pro",
    price: "$9",
    priceId: "price_1SzwtQIXXAX38UQrFhshyIaB",
    features: ["30 Links", "30 QRs", "Analytics Dashboard"],
  },
  {
    name: "Business",
    price: "$29",
    priceId: "price_1SzwttIXXAX38UQrXcdksKRn",
    features: [
      "Unlimited Links",
      "Unlimited QRs",
      "Analytics Dashboard",
      "API Access",
    ],
  },
];

export function SubscriptionTable({
  userId,
  userEmail,
}: {
  userId: number;
  userEmail: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10 bg-slate-950 text-white">
      {PLANS.map((plan) => (
        <div
          key={plan.name}
          className="border border-slate-800 p-8 rounded-2xl bg-slate-900 flex flex-col"
        >
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <div className="text-4xl font-bold my-4">
            {plan.price}
            <span className="text-sm font-normal text-slate-400">/mo</span>
          </div>

          <ul className="flex-1 space-y-3 mb-8">
            {plan.features.map((f) => (
              <li key={f} className="text-sm text-slate-300">
                ✓ {f}
              </li>
            ))}
          </ul>

          <form
            action={async () => {
              if (!plan.priceId) return; // Free plan logic
              await createCheckoutSession(userId, userEmail, plan.priceId);
            }}
          >
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={!plan.priceId}
            >
              {plan.priceId ? "Buy Now" : "Current Plan"}
            </Button>
          </form>
        </div>
      ))}
    </div>
  );
}
