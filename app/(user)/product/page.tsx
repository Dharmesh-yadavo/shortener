"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white font-roboto selection:bg-teal-50 overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="mt-30 pb-20 px-6 text-center">
        <motion.div {...fadeIn} className="space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
            Product{" "}
            <span className="font-amiri italic text-teal-400">Overview</span>
          </h1>
          <p className="text-zinc-500 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Discover how Shorten.io transforms long, cluttered URLs into
            powerful brand assets with just a few clicks.
          </p>
        </motion.div>
      </section>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        {/* FEATURE 01 */}
        <FeatureSection
          number="01"
          title="Paste &"
          titleItalic="Shorten."
          description="The journey begins with simplicity. Drop your long, cumbersome URLs into our high-performance engine."
          bullets={["Instant link generation", "Secure HTTPS by default"]}
          colorClass="text-teal-400"
          tilt="rotate-[-1.5deg]"
        />

        {/* FEATURE 02 */}
        <FeatureSection
          number="02"
          title="Customize &"
          titleItalic="Brand."
          description="Make every link an extension of your brand identity. Change the slug and generate elegant QR codes."
          bullets={["Custom Domains", "QR Styles", "UTM Tags"]}
          colorClass="text-pink-400"
          reverse={true}
          tilt="rotate-[1.5deg]"
        />

        {/* FEATURE 03 */}
        <FeatureSection
          number="03"
          title="Track &"
          titleItalic="Analyze."
          description="Data is the heartbeat of your strategy. Gain deep insights into where your audience is coming from."
          bullets={[
            "Real-time Analytics",
            "Geographic Tracking",
            "Device Insights",
          ]}
          colorClass="text-teal-400"
          tilt="rotate-[-1.5deg]"
        />

        {/* --- COMPACT CTA SECTION --- */}
        <section className="py-16">
          <motion.div
            {...fadeIn}
            className="bg-zinc-900 rounded-[2rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-linear-to-br from-teal-500/10 to-pink-500/5 z-0" />

            <div className="relative z-10 space-y-10">
              <h2 className="text-3xl md:text-4xl font-bold font-roboto tracking-tight">
                Ready to start your <br />
                <span className="font-amiri italic text-teal-400">
                  growth journey?
                </span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link href="/register">
                  <Button
                    size="default"
                    className="bg-teal-400 text-zinc-900 hover:bg-teal-300 px-6 py-5 text-base font-bold rounded-xl transition-all"
                  >
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

function FeatureSection({
  number,
  title,
  titleItalic,
  description,
  bullets,
  reverse,
  colorClass,
  tilt,
}: any) {
  return (
    <section className="py-8">
      <div
        className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-30`}
      >
        {/* SMALLER TILTED MOCKUP */}
        <motion.div {...fadeIn} className="flex-1 w-full max-w-lg">
          <div
            className={`aspect-4/3 bg-white border border-zinc-100 rounded-2xl shadow-lg flex items-center justify-center relative transition-transform duration-500 ${tilt}`}
          >
            <div className="absolute top-3 left-3 flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400/60" />
              <div className="w-2 h-2 rounded-full bg-amber-400/60" />
              <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
            </div>
            <span className="text-zinc-200 font-mono text-[10px] uppercase tracking-tighter">
              Mockup
            </span>
          </div>
        </motion.div>

        {/* REFINED TEXT CONTENT */}
        <motion.div {...fadeIn} className="flex-1 space-y-4 text-left">
          <div className="space-y-1">
            <span
              className={`text-5xl font-black opacity-10 block leading-none ${colorClass}`}
            >
              {number}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight">
              {title}{" "}
              <span className={`font-amiri italic ${colorClass}`}>
                {titleItalic}
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-base leading-relaxed max-w-sm">
            {description}
          </p>
          <ul className="space-y-2">
            {bullets.map((bullet: string) => (
              <li
                key={bullet}
                className="flex items-center gap-2 text-zinc-700 text-sm font-semibold"
              >
                <CheckCircle2 size={16} className={colorClass} />
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
