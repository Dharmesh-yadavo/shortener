"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Globe,
  MoreHorizontal,
  ExternalLink,
  QrCode,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** --- TYPES --- */
interface FeatureItem {
  items: string[];
  color: string;
}

interface MockupProps {
  children: React.ReactNode;
  tilt: string;
}

/** --- ANIMATION VARIANTS --- */
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

/** --- INNER CONTENT MOCKUPS --- */

const LinkPreviewUI: React.FC = () => (
  <div className="w-full bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden">
    <div className="p-3 border-b border-zinc-50 flex justify-between items-center bg-zinc-50/50">
      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
        Active Links
      </span>
      <MoreHorizontal size={14} className="text-zinc-300" />
    </div>
    <div className="p-4 space-y-4">
      {[
        {
          label: "short.io/summer-sale",
          clicks: "12,402",
          color: "bg-teal-400",
        },
        { label: "short.io/product-demo", clicks: "843", color: "bg-zinc-200" },
      ].map((link, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-white",
                link.color,
              )}
            >
              <ExternalLink size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-800">{link.label}</p>
              <p className="text-[9px] text-zinc-400">Last click 2m ago</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-black text-zinc-900">{link.clicks}</p>
            <p className="text-[9px] text-zinc-400 uppercase font-bold">
              Clicks
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const QRStudioUI: React.FC = () => (
  <div className="flex flex-col items-center gap-6 w-full">
    <div className="p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm relative">
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-teal-400 rounded-lg flex items-center justify-center text-white shadow-lg">
        <QrCode size={12} />
      </div>
      <div className="w-32 h-32 bg-teal-50/30 rounded-lg border-2 border-teal-100 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-2 opacity-80">
          <div className="w-10 h-10 border-[6px] border-zinc-900 rounded-sm" />
          <div className="w-10 h-10 border-[6px] border-zinc-900 rounded-sm" />
          <div className="w-10 h-10 border-[6px] border-zinc-900 rounded-sm" />
          <div className="w-10 h-10 border-[6px] border-zinc-900 rounded-sm" />
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-teal-400 ring-2 ring-teal-100 ring-offset-2" />
      <div className="w-3 h-3 rounded-full bg-indigo-100" />
      <div className="w-3 h-3 rounded-full bg-zinc-900" />
      <div className="w-3 h-3 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[8px] font-bold text-zinc-400">
        +
      </div>
    </div>
    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
      Live Customizer
    </span>
  </div>
);

const EnterpriseAnalyticsUI: React.FC = () => (
  <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 space-y-6">
    <div className="flex items-end justify-between h-24 gap-2">
      {[40, 70, 100, 30, 85, 60].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={cn(
            "w-full rounded-sm",
            i === 2 ? "bg-teal-400" : "bg-teal-100",
          )}
        />
      ))}
    </div>
    <div className="grid grid-cols-2 gap-4 border-t border-zinc-50 pt-4">
      <div>
        <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">
          Avg. CTR
        </p>
        <p className="text-sm font-black text-zinc-900">12.4%</p>
      </div>
      <div>
        <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">
          Global Reach
        </p>
        <p className="text-sm font-black text-zinc-900">142 Countries</p>
      </div>
    </div>
  </div>
);

/** --- HELPERS --- */

const CustomTick: React.FC<{ color: string }> = ({ color }) => (
  <div
    className={cn(
      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
      color.replace("text", "border"),
    )}
  >
    <div
      className={cn("w-1.5 h-1.5 rounded-full", color.replace("text", "bg"))}
    />
  </div>
);

const FeatureList: React.FC<FeatureItem> = ({ items, color }) => (
  <ul className="space-y-4">
    {items.map((item) => (
      <li
        key={item}
        className="flex items-center gap-4 text-zinc-700 font-medium text-sm"
      >
        <CustomTick color={color} />
        {item}
      </li>
    ))}
  </ul>
);

const MockupContainer: React.FC<MockupProps> = ({ children, tilt }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={cn(
      "aspect-4/3 w-full max-w-md mx-auto rounded-[2.5rem] flex items-center justify-center p-10 transition-all duration-700 hover:rotate-0",
      "shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white border border-zinc-100/50",
      tilt,
    )}
  >
    {children}
  </motion.div>
);

/** --- MAIN PAGE --- */

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50/30 font-roboto selection:bg-teal-50 overflow-x-hidden">
      {/* Header Section: Standardized padding to fix image_7de119 extra space */}
      <section className="pt-24 pb-12 text-center px-6">
        <motion.div {...fadeIn} className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 leading-tight">
            Comprehensive{" "}
            <span className="font-amiri italic text-teal-400">
              Platform Features
            </span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl leading-relaxed">
            Professional tools designed to elevate your link management and
            marketing.
          </p>
        </motion.div>
      </section>

      {/* Main Grid: standardized vertical spacing (space-y-24) */}
      <div className="max-w-6xl mx-auto px-6 space-y-24 pb-32">
        {/* Advanced Link Management */}
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="flex-1 space-y-6 text-left">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-400">
              <Zap size={20} />
            </div>
            <h2 className="text-3xl font-bold text-zinc-900">
              Advanced Link Management
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              Full control of your digital presence with editable slugs and
              automated expiration.
            </p>
            <FeatureList
              color="text-teal-400"
              items={[
                "Custom branded domains",
                "Bulk link creation",
                "Real-time redirect editing",
              ]}
            />
          </div>
          <div className="flex-1">
            <MockupContainer tilt="rotate-[-4deg]">
              <LinkPreviewUI />
            </MockupContainer>
          </div>
        </div>

        {/* Smart QR Studio */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
          <div className="flex-1 space-y-6 text-left">
            <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center text-pink-400">
              <Shield size={20} />
            </div>
            <h2 className="text-3xl font-bold text-zinc-900">
              Smart QR Studio
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              Design stunning QR codes that match your brand perfectly and
              update destination URLs anytime.
            </p>
            <FeatureList
              color="text-pink-400"
              items={[
                "SVG, PNG, and PDF exports",
                "Logo integration",
                "Print-ready high resolution",
              ]}
            />
          </div>
          <div className="flex-1">
            <MockupContainer tilt="rotate-[4deg]">
              <QRStudioUI />
            </MockupContainer>
          </div>
        </div>

        {/* Enterprise Analytics */}
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="flex-1 space-y-6 text-left">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-400">
              <Globe size={20} />
            </div>
            <h2 className="text-3xl font-bold text-zinc-900">
              Enterprise Analytics
            </h2>
            <p className="text-zinc-500 leading-relaxed">
              Deep dive into audience metrics. Track geographic distribution and
              device types in real-time.
            </p>
            <FeatureList
              color="text-teal-400"
              items={[
                "Interactive click heatmaps",
                "UTM parameter tracking",
                "Automated weekly reports",
              ]}
            />
          </div>
          <div className="flex-1">
            <MockupContainer tilt="rotate-[-4deg]">
              <EnterpriseAnalyticsUI />
            </MockupContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
