"use client";

import { Button } from "@/components/ui/button";
import { createCustomerPortalSession } from "@/server/subscription/action.stripe";
import {
  Settings,
  CreditCard,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  CalendarDays,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type UserData = {
  id: number;
  name: string;
  email: string;
  stripeCustomerId: string | null;
  plan: "free" | "pro" | "business" | null;
  planExpiresAt: Date | null;
  linksCreated: number;
  qrsCreated: number;
  createdAt: Date;
  updatedAt: Date;
};

const PLAN_FEATURES = {
  free: [
    { text: "5 Shortened Links", included: true },
    { text: "5 Dynamic QRs", included: true },
    { text: "Analytics Dashboard", included: false },
    { text: "API Access", included: false },
  ],
  pro: [
    { text: "30 Shortened Links", included: true },
    { text: "30 Dynamic QRs", included: true },
    { text: "Analytics Dashboard", included: true },
    { text: "API Access", included: false },
  ],
  business: [
    { text: "Unlimited Links", included: true },
    { text: "Unlimited QRs", included: true },
    { text: "Advanced Analytics", included: true },
    { text: "Priority API Access", included: true },
  ],
};

export const ManageSubscriptionComp = ({ user }: { user: UserData }) => {
  const isSubscribed = user.plan !== "free" && user.stripeCustomerId;
  const currentFeatures =
    user.plan && user.plan !== "free" ? PLAN_FEATURES[user.plan] : [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-2 space-y-10 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Billing & Plan
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your subscription, payment methods, and usage limits.
          </p>
        </div>

        {isSubscribed && (
          <form
            action={async () => {
              await createCustomerPortalSession(user.stripeCustomerId!);
            }}
          >
            <Button className="h-11 px-6 bg-slate-900 text-white hover:bg-slate-800 rounded-full shadow-lg transition-all active:scale-95 flex items-center gap-2 group">
              <Settings
                size={18}
                className="group-hover:rotate-45 transition-transform"
              />
              Manage via Stripe
              <ArrowUpRight size={16} className="opacity-50" />
            </Button>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 💎 Main Plan Card */}
        <div className="lg:col-span-2 relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>

          <div className="relative h-full bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-indigo-600 pointer-events-none">
              <ShieldCheck size={180} />
            </div>

            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-indigo-600 text-white rounded-md px-2.5 py-0.5 text-[11px] font-bold shadow-sm shadow-indigo-200">
                  CURRENT PLAN
                </Badge>
                {isSubscribed && (
                  <>
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                      <Globe size={12} /> RENEWS MONTHLY
                    </span>
                    {user.planExpiresAt && (
                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                        <CalendarDays size={12} /> EXPIRES:{" "}
                        {new Date(user.planExpiresAt).toLocaleDateString()}
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-6xl font-black text-slate-900 capitalize tracking-tighter">
                  {user.plan || "Free"}
                </h2>

                {/* Dynamic Feature List Integration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {user.plan === "free" ? (
                    <div className="flex items-center gap-2 text-slate-500">
                      <CheckCircle2
                        size={18}
                        className="text-emerald-500 shrink-0"
                      />
                      <p className="text-sm font-semibold tracking-wide uppercase">
                        Limited Access
                      </p>
                    </div>
                  ) : (
                    currentFeatures.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-slate-600"
                      >
                        {feature.included ? (
                          <CheckCircle2
                            size={16}
                            className="text-emerald-500 shrink-0"
                          />
                        ) : (
                          <XCircle
                            size={16}
                            className="text-slate-300 shrink-0"
                          />
                        )}
                        <p
                          className={`text-xs font-bold uppercase tracking-tight ${feature.included ? "text-slate-700" : "text-slate-400 line-through decoration-slate-300"}`}
                        >
                          {feature.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <div
                    className={`p-1 rounded-full ${user.plan === "free" ? "bg-slate-100" : "bg-emerald-100"}`}
                  >
                    <CheckCircle2
                      size={14}
                      className={
                        user.plan === "free"
                          ? "text-slate-400"
                          : "text-emerald-600"
                      }
                    />
                  </div>
                  <p className="text-[13px] font-bold text-slate-600 uppercase tracking-wide">
                    {user.plan === "free"
                      ? "Limited Access"
                      : "Full Platform Access Unlocked"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Premium Support Enabled
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 📊 High-Contrast Usage Card */}
        <div className="bg-slate-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

          <div className="relative space-y-8">
            <div className="space-y-1">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                Asset Usage
              </p>
              <h3 className="text-xl font-bold">Platform Activity</h3>
            </div>

            <div className="space-y-6">
              {/* Links Progress */}
              <div className="group cursor-default">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                    Links Created
                  </span>
                  <span className="text-2xl font-black tabular-nums tracking-tight">
                    {user.linksCreated}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                    style={{
                      width: `${Math.min((user.linksCreated / (user.plan === "pro" ? 30 : 50)) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* QRs Progress */}
              <div className="group cursor-default">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-purple-400 transition-colors uppercase tracking-tight">
                    QRs Generated
                  </span>
                  <span className="text-2xl font-black tabular-nums tracking-tight">
                    {user.qrsCreated}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                    style={{
                      width: `${Math.min((user.qrsCreated / (user.plan === "pro" ? 30 : 50)) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 pt-6 border-t border-slate-800/50">
            <p className="text-[10px] text-slate-500 font-medium">
              Data refreshes automatically on dashboard activity.
            </p>
          </div>
        </div>
      </div>

      {/* 💳 Payment Methods Shortcut */}
      {!isSubscribed && (
        <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-amber-100">
              <CreditCard className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900">
                No active subscription found
              </p>
              <p className="text-xs text-amber-700/80">
                Upgrade to unlock advanced analytics and higher limits.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-white border-amber-200 text-amber-900 hover:bg-amber-100 font-bold px-8 shadow-sm"
          >
            View Plans
          </Button>
        </div>
      )}
    </div>
  );
};
