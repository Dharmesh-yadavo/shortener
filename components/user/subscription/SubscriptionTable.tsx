"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createCheckoutSession } from "@/server/subscription/action.stripe";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const PLANS = [
  {
    name: "Free",
    description: "Perfect for personal projects and experimentation.",
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
    description: "Enhanced features for power users and small teams.",
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
    description: "Advanced tools for enterprise-level scale and speed.",
    price: "$29",
    priceId: "price_1SzwttIXXAX38UQrXcdksKRn",
    features: [
      { text: "Unlimited Links", included: true },
      { text: "Unlimited QRs", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Priority API Access", included: true },
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
    <section className="relative w-full min-h-screen flex items-center justify-center bg-slate-50/50 overflow-x-hidden px-4 py-24">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Simple, transparent <span className="text-indigo-600">pricing</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-lg">
            Choose the plan that&apos;s right for your business. No hidden fees
            or surprise charges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={cn(
                "relative flex flex-col p-6 rounded-[2.5rem] bg-white border border-slate-200 transition-all duration-300",
                "shadow-2xs hover:shadow-2xl",
                plan.popular &&
                  "border-indigo-500 ring-1 ring-indigo-500 scale-105 bg-white",
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 px-6 rounded-full shadow-lg shadow-indigo-200">
                  Most Popular
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-500 text-sm mb-6 h-10 line-clamp-2 italic">
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-slate-400 font-semibold text-lg">
                    /mo
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-slate-100 mb-4" />

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div
                      className={cn(
                        "p-1 rounded-full shrink-0 transition-colors",
                        feature.included
                          ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
                          : "bg-slate-50 text-slate-300",
                      )}
                    >
                      {feature.included ? (
                        <Check className="w-3.5 h-3.5 stroke-3" />
                      ) : (
                        <X className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm transition-colors",
                        feature.included
                          ? "text-slate-600 font-medium"
                          : "text-slate-300 line-through decoration-slate-200",
                      )}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <form
                className="mt-auto"
                action={async () => {
                  if (!plan.priceId) return;
                  await createCheckoutSession(userId, userEmail, plan.priceId);
                }}
              >
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    className={cn(
                      "w-full h-14 rounded-2xl text-base font-bold transition-all shadow-md",
                      plan.priceId
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200/50"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-default shadow-none border border-slate-200",
                    )}
                  >
                    {plan.priceId ? "Get Started" : "Current Plan"}
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
