"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap, Shield, Globe, Users } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white font-roboto selection:bg-teal-50 pt-20">
      {/* --- HEADER --- */}
      <section className="py-20 text-center px-6">
        <motion.div {...fadeIn} className="max-w-3xl mx-auto space-y-4">
          <span className="text-teal-400 font-bold tracking-widest text-xs uppercase">
            Our Ecosystem
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 leading-tight">
            Comprehensive{" "}
            <span className="font-amiri italic text-teal-400">
              Platform Features
            </span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl leading-relaxed">
            A suite of professional tools designed to elevate your link
            management and offline-to-online marketing.
          </p>
        </motion.div>
      </section>

      {/* --- FEATURE GRID (max-w-6xl) --- */}
      <div className="max-w-6xl mx-auto px-6 space-y-32 pb-32">
        {/* 01: Advanced Management */}
        <div className="flex flex-col md:flex-row items-center gap-24">
          <div className="flex-1 space-y-6">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-400">
              <Zap size={20} />
            </div>
            <h2 className="text-3xl font-bold text-zinc-900">
              Advanced Link Management
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              Beyond simple shortening. Take full control of your digital
              presence with editable slugs, password protection, and automated
              link expiration.
            </p>
            <FeatureList
              items={[
                "Custom branded domains",
                "Bulk link creation",
                "Real-time redirect editing",
              ]}
              color="text-teal-400"
            />
          </div>
          <div className="flex-1">
            <MockupContainer tilt="rotate-[-2deg]" color="bg-teal-400">
              <span className="text-zinc-300 font-mono text-xs italic">
                Active Links Preview
              </span>
            </MockupContainer>
          </div>
        </div>

        {/* 02: Smart QR Studio */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-24">
          <div className="flex-1 space-y-6">
            <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center text-pink-400">
              <Shield size={20} />
            </div>
            <h2 className="text-3xl font-bold text-zinc-900">
              Smart QR Studio
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              Design stunning QR codes that match your brand. Our dynamic codes
              allow you to update the destination URL even after printing.
            </p>
            <FeatureList
              items={[
                "SVG, PNG, and PDF exports",
                "Logo integration",
                "Print-ready high resolution",
              ]}
              color="text-pink-400"
            />
          </div>
          <div className="flex-1">
            <MockupContainer tilt="rotate-[2deg]" color="bg-pink-400">
              <div className="w-32 h-32 bg-zinc-100 rounded-xl flex items-center justify-center border-2 border-dashed border-zinc-200">
                <span className="text-zinc-400 text-[10px]">QR MOCKUP</span>
              </div>
            </MockupContainer>
          </div>
        </div>

        {/* 03: Enterprise Analytics */}
        <div className="flex flex-col md:flex-row items-center gap-24">
          <div className="flex-1 space-y-6">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-400">
              <Globe size={20} />
            </div>
            <h2 className="text-3xl font-bold text-zinc-900">
              Enterprise Analytics
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              Deep dive into your audience metrics. Track geographic
              distribution, device types, and referral sources in real-time.
            </p>
            <FeatureList
              items={[
                "Interactive click heatmaps",
                "UTM parameter tracking",
                "Automated weekly reports",
              ]}
              color="text-teal-400"
            />
          </div>
          <div className="flex-1">
            <MockupContainer tilt="rotate-[-2deg]" color="bg-teal-400">
              <div className="flex items-end gap-2 h-32">
                <div className="w-8 h-[40%] bg-teal-200 rounded-t-sm" />
                <div className="w-8 h-[70%] bg-teal-300 rounded-t-sm" />
                <div className="w-8 h-[100%] bg-teal-400 rounded-t-sm" />
                <div className="w-8 h-[60%] bg-teal-100 rounded-t-sm" />
              </div>
            </MockupContainer>
          </div>
        </div>

        {/* --- COMPARISON TABLE --- */}
        <section className="pt-10 text-center space-y-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-zinc-900">
              Choose Your{" "}
              <span className="font-amiri italic text-teal-400">Power</span>
            </h2>
            <p className="text-zinc-500">
              A comparison of our specialized feature sets.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-zinc-100 bg-white shadow-xl shadow-zinc-200/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="p-8 text-sm font-bold text-zinc-400 uppercase tracking-widest">
                    Features
                  </th>
                  <th className="p-8 text-lg font-bold text-zinc-900">Free</th>
                  <th className="p-8 text-lg font-bold text-pink-400">Pro</th>
                  <th className="p-8 text-lg font-bold text-zinc-900">
                    Business
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                <TableRow
                  label="Link Customization"
                  free={true}
                  pro={true}
                  biz={true}
                />
                <TableRow
                  label="Dynamic QR Codes"
                  free={false}
                  pro={true}
                  biz={true}
                />
                <TableRow
                  label="Heatmap Analytics"
                  free={false}
                  pro={true}
                  biz={true}
                />
                <TableRow
                  label="API Access"
                  free={false}
                  pro={false}
                  biz={true}
                />
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

// --- HELPERS ---

function FeatureList({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-3 text-zinc-700 font-medium text-sm"
        >
          <CheckCircle2 size={18} className={color} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function MockupContainer({
  children,
  tilt,
  color,
}: {
  children: React.ReactNode;
  tilt: string;
  color: string;
}) {
  return (
    <div
      className={`aspect-[4/3] w-full max-w-lg mx-auto ${color}/5 rounded-[2.5rem] border border-zinc-100 flex items-center justify-center p-8 transition-transform duration-700 hover:rotate-0 ${tilt} shadow-xl bg-white`}
    >
      {children}
    </div>
  );
}

function TableRow({ label, free, pro, biz }: any) {
  const renderValue = (val: any) => {
    if (typeof val === "boolean")
      return val ? (
        <CheckCircle2 size={18} className="text-pink-400" />
      ) : (
        <span className="text-zinc-300">—</span>
      );
    return <span className="font-bold">{val}</span>;
  };
  return (
    <tr>
      <td className="px-8 py-5 text-zinc-600 font-medium">{label}</td>
      <td className="px-8 py-5">{renderValue(free)}</td>
      <td className="px-8 py-5">{renderValue(pro)}</td>
      <td className="px-8 py-5">{renderValue(biz)}</td>
    </tr>
  );
}
