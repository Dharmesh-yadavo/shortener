"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createCheckoutSession } from "@/server/subscription/action.stripe";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

// const PLANS = [
//   {
//     name: "Free",
//     price: "$0",
//     priceId: null,
//     features: ["5 Links", "5 QRs"],
//   },
//   {
//     name: "Pro",
//     price: "$9",
//     priceId: "price_1SzwtQIXXAX38UQrFhshyIaB",
//     features: ["30 Links", "30 QRs", "Analytics Dashboard"],
//   },
//   {
//     name: "Business",
//     price: "$29",
//     priceId: "price_1SzwttIXXAX38UQrXcdksKRn",
//     features: [
//       "Unlimited Links",
//       "Unlimited QRs",
//       "Analytics Dashboard",
//       "API Access",
//     ],
//   },
// ];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    priceId: null,
    features: [
      { text: "5 Shortened Links", included: true },
      { text: "5 Dynamic QRs", included: true },
      { text: "Analytics Dashboard", included: false },
      { text: "API Access", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$9",
    priceId: "price_1SzwtQIXXAX38UQrFhshyIaB",
    popular: true,
    features: [
      { text: "30 Shortened Links", included: true },
      { text: "30 Dynamic QRs", included: true },
      { text: "Analytics Dashboard", included: true },
      { text: "API Access", included: false },
    ],
  },
  {
    name: "Business",
    price: "$29",
    priceId: "price_1SzwttIXXAX38UQrXcdksKRn",
    features: [
      { text: "Unlimited Links", included: true },
      { text: "Unlimited QRs", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Priority API Access", included: true },
      { text: "Custom Domains", included: true },
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
    <section className="relative w-full h-screen flex items-center justify-center bg-slate-50 overflow-x-hidden px-4 py-12">
      <div className="container mx-auto px-4">
        {/* Header with Fade-in Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-lg">
            Choose the plan that&apos;s right for your business. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={cn(
                "relative flex flex-col p-8 rounded-[2.5rem] bg-white transition-shadow duration-300",
                "border border-slate-200 shadow-xl shadow-slate-200/50",
                plan.popular &&
                  "border-indigo-500 ring-1 ring-indigo-500 md:py-12 shadow-2xl shadow-indigo-100",
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-5 rounded-full shadow-lg shadow-indigo-200">
                  Most Popular
                </div>
              )}

              <div className="mb-6 text-center">
                <h3 className="text-xl font-bold text-slate-800">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-6xl font-black text-slate-900 leading-none">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-slate-500 font-medium">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-5 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px]">
                    <div
                      className={cn(
                        "p-1 rounded-full",
                        feature.included
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-slate-100 text-slate-400",
                      )}
                    >
                      {feature.included ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </div>
                    <span
                      className={
                        feature.included
                          ? "text-slate-700 font-medium"
                          : "text-slate-400 line-through"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <form
                action={async () => {
                  if (!plan.priceId) return;
                  await createCheckoutSession(userId, userEmail, plan.priceId);
                }}
              >
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    className={cn(
                      "w-full h-14 rounded-2xl text-lg font-bold transition-all",
                      plan.priceId
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-default",
                    )}
                  >
                    {plan.priceId ? "Get Started" : "Your Plan"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
