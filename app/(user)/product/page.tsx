"use client";

import React, { JSX } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, QrCode } from "lucide-react";
import Link from "next/link";

/** --- TYPES & INTERFACES --- */

interface FeatureSectionProps {
  number: string;
  title: string;
  titleItalic: string;
  description: string;
  bullets: string[];
  colorClass: string;
  tilt: string;
  children: React.ReactNode;
  reverse?: boolean;
}

/** --- ANIMATION VARIANTS --- */
const fadeIn: Variants = {
  initial: { opacity: 0, y: 15 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Helper for viewport settings to avoid repetition
const viewportConfig = { once: true };

/** --- MOCKUP 01: PASTE & SHORTEN --- */
const ShortenMockup: React.FC = () => (
  <div className="w-full space-y-4">
    <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100 text-[10px] text-zinc-400 truncate font-mono">
      https://your-very-long-enterprise-campaign-url.com/tracking?id=928347923...
    </div>
    <div className="flex justify-end">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-teal-400 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-teal-400/20 cursor-default"
      >
        Shorten
      </motion.div>
    </div>
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportConfig}
      className="p-3 bg-teal-50/50 rounded-lg border border-teal-100 flex justify-between items-center"
    >
      <span className="text-teal-600 font-bold text-xs">
        shorten.io/campaign-v1
      </span>
      <Copy size={14} className="text-teal-300" />
    </motion.div>
  </div>
);

/** --- MOCKUP 02: QR CUSTOMIZER --- */
const QRMockup: React.FC = () => (
  <div className="w-full text-center space-y-4">
    <div className="flex justify-between items-center mb-2">
      <span className="text-[10px] font-bold text-zinc-800">QR Customizer</span>
      <div className="flex gap-1">
        <div className="w-3 h-3 bg-teal-400 rounded-sm" />
        <div className="w-3 h-3 bg-zinc-200 rounded-sm" />
        <div className="w-3 h-3 bg-zinc-900 rounded-sm" />
      </div>
    </div>
    <div className="w-32 h-32 mx-auto bg-white p-2 border border-zinc-100 rounded-xl shadow-sm flex items-center justify-center relative">
      <div className="w-full h-full border-[6px] border-zinc-900 rounded-sm p-1 flex flex-wrap gap-1 opacity-80">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 ${i % 3 === 0 ? "bg-zinc-900" : "bg-teal-400/20"}`}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <QrCode size={40} className="text-zinc-900" />
        </div>
      </div>
    </div>
    <div className="space-y-1.5">
      <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "68%" }}
          viewport={viewportConfig}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-teal-400"
        />
      </div>
      <div className="flex justify-between text-[8px] uppercase tracking-widest text-zinc-400 font-bold">
        <span>Design Polish</span>
        <span>68%</span>
      </div>
    </div>
  </div>
);

/** --- MOCKUP 03: ANALYTICS CHART --- */
const AnalyticsMockup: React.FC = () => (
  <div className="w-full space-y-6">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-[10px] font-bold text-zinc-800">
          Performance Metrics
        </h4>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xl font-black text-zinc-900">12.4k</span>
          <span className="text-[8px] text-teal-500 font-bold">+18.2%</span>
        </div>
      </div>
      <div className="flex gap-1">
        <div className="bg-teal-50 text-teal-600 text-[7px] font-bold px-1.5 py-0.5 rounded-full border border-teal-100 animate-pulse">
          Live
        </div>
      </div>
    </div>
    <div className="flex items-end justify-between h-20 gap-1.5">
      {[40, 70, 45, 90, 65, 100, 80].map((height, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          viewport={viewportConfig}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`flex-1 rounded-t-sm ${i === 5 ? "bg-teal-400" : "bg-teal-100"}`}
        />
      ))}
    </div>
  </div>
);

/** --- MAIN PAGE COMPONENT --- */
export default function ProductPage(): JSX.Element {
  return (
    <div className="min-h-screen  bg-white font-roboto selection:bg-teal-50 overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="mt-25 pb-20 px-6 text-center">
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={viewportConfig}
          className="space-y-4 max-w-2xl mx-auto"
        >
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
      <div className="max-w-6xl mx-auto px-6 space-y-24 pb-20">
        <FeatureSection
          number="01"
          title="Paste &"
          titleItalic="Shorten."
          description="The journey begins with simplicity. Drop your long, cumbersome URLs into our high-performance engine."
          bullets={["Instant link generation", "Secure HTTPS by default"]}
          colorClass="text-teal-400"
          tilt="rotate-[-4deg]"
        >
          <ShortenMockup />
        </FeatureSection>

        <FeatureSection
          number="02"
          title="Customize &"
          titleItalic="Brand."
          description="Make every link an extension of your brand identity. Change the slug and generate elegant QR codes that match your brand's aesthetic."
          bullets={["Custom Domains", "QR Styles", "UTM Tags"]}
          colorClass="text-pink-400"
          reverse={true}
          tilt="rotate-[4deg]"
        >
          <QRMockup />
        </FeatureSection>

        <FeatureSection
          number="03"
          title="Track &"
          titleItalic="Analyze."
          description="Data is the heartbeat of your strategy. Gain deep insights into where your audience is coming from and which devices they use."
          bullets={[
            "Real-time Analytics",
            "Geographic Tracking",
            "Device Insights",
          ]}
          colorClass="text-teal-400"
          tilt="rotate-[-4deg]"
        >
          <AnalyticsMockup />
        </FeatureSection>

        {/* --- COMPACT CTA SECTION --- */}
        <section className="pt-10">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportConfig}
            className="bg-zinc-900 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent z-0" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold font-roboto tracking-tight">
                Ready to start your <br />
                <span className="font-amiri italic text-teal-400">
                  growth journey?
                </span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-teal-400 text-zinc-900 hover:bg-teal-300 px-10 py-7 text-lg font-bold rounded-2xl transition-all hover:scale-105"
                  >
                    Get Started for Free
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

/** --- REUSABLE FEATURE SECTION COMPONENT --- */
function FeatureSection({
  number,
  title,
  titleItalic,
  description,
  bullets,
  reverse = false,
  colorClass,
  tilt,
  children,
}: FeatureSectionProps): JSX.Element {
  return (
    <section className="py-6">
      <div
        className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-16 md:gap-32`}
      >
        {/* INTERACTIVE MOCKUP BOX */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={viewportConfig}
          whileHover={{ scale: 1.02 }}
          className="flex-1 w-full max-w-lg"
        >
          <div
            className={`aspect-4/3 bg-white border border-zinc-100 rounded-[2.5rem] shadow-2xl flex flex-col relative overflow-hidden transition-transform duration-700 ${tilt} hover:rotate-0  `}
          >
            {/* Header / Mac Style Dots */}
            <div className="p-5 border-b border-zinc-50 flex gap-2 bg-zinc-50/50">
              <div className="w-3 h-3 rounded-full bg-red-400/40" />
              <div className="w-3 h-3 rounded-full bg-amber-400/40" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/40" />
            </div>

            {/* Inner Content Area */}
            <div className="flex-1 p-8 flex items-center justify-center">
              {children}
            </div>
          </div>
        </motion.div>

        {/* TEXT CONTENT */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          viewport={viewportConfig}
          className="flex-1 space-y-6 text-left"
        >
          <div className="space-y-2">
            <span
              className={`text-6xl font-black opacity-10 block leading-none ${colorClass}`}
            >
              {number}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.1]">
              {title}
              <br />
              <span className={`font-amiri italic ${colorClass}`}>
                {titleItalic}
              </span>
            </h2>
          </div>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
            {description}
          </p>
          <ul className="grid grid-cols-1 gap-3 pt-2">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-2 text-zinc-700 text-md font-bold"
              >
                <CheckCircle2 size={20} className={colorClass} />
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
