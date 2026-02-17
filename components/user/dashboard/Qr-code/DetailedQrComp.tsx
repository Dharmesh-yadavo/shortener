/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Palette,
  Pencil,
  Download,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChartTimeline } from "@/components/common/BarChartTimeline";
// import { ScanActivityChart } from "./ScanActivityChart";

interface QrDetailsPageProps {
  title: string | null;
  url: string;
  shortCode: string;
  isActive: boolean;
  createdAt: Date;
  type: string;
  clicks: number;
  fgColor: string | null;
  bgColor: string | null;
  logoUrl: string | null;
}

interface AnalyticsData {
  date: unknown;
  desktop: number;
  mobile: number;
  other: number;
}
export const DetailedQrComp = ({
  initialData,
  activityData,
  userPlan,
}: {
  initialData: QrDetailsPageProps;
  activityData: AnalyticsData[];
  userPlan: string | null;
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const fullShortUrl = mounted
    ? `${window.location.origin}/${initialData.shortCode}`
    : "";

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
      }

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-code-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  {initialData.title}
                </h1>
              </div>
            </div>

            <div className="space-y-1 font-sans">
              <div className="flex items-center gap-2">
                <Link
                  href={fullShortUrl}
                  target="_blank"
                  className="text-blue-600 font-extrabold text-lg hover:underline flex items-center gap-1.5"
                >
                  {fullShortUrl} <ExternalLink size={14} />
                </Link>
              </div>
              <p className="text-slate-400 text-xs max-w-xl truncate">
                <span className="text-slate-300 font-bold uppercase text-[9px]">
                  Target:
                </span>{" "}
                {initialData.url}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href={`/dashboard/qr-code/${initialData.shortCode}/edit/customize`}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-600 h-8 w-8 bg-blue-50"
              >
                <Palette size={18} />
              </Button>
            </Link>
            <Link href={`/dashboard/qr-code/${initialData.shortCode}/edit`}>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-600 h-8 w-8 bg-blue-50"
              >
                <Pencil size={18} />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="text-blue-600 h-8 w-8 bg-blue-50"
              onClick={downloadQR}
            >
              <Download size={18} />
            </Button>
            <div
              ref={qrRef}
              className="shrink-0 p-3 bg-white border-2 border-slate-100 rounded-xl shadow-inner group relative"
            >
              <QRCode
                value={initialData.url}
                size={100}
                fgColor={initialData.fgColor || "#d946ef"}
                level="M"
              />
              {initialData.logoUrl ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="rounded-lg shadow-md overflow-hidden w-6 h-6 flex items-center justify-center"
                    style={{
                      backgroundColor: initialData.bgColor || "#ffffff",
                    }}
                  >
                    <img
                      src={initialData.logoUrl}
                      alt="center logo"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 text-slate-400 text-[9px] font-black uppercase tracking-widest border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Qr {initialData.isActive ? "Active" : "Deactive"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300">CREATED:</span>
            <span className="text-slate-500 font-sans">
              {new Date(initialData.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* ANALYTICS SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Scan data
          </h2>
        </div>

        {/* PRO PREVIEW BANNER (Matches your image_b82cde.png) */}
        {userPlan == "free" && (
          <div className="bg-[#f0f9ff] border-l-4 border-[#0ea5e9] p-4 rounded-r-lg flex items-center gap-3 transition-all animate-in fade-in slide-in-from-top-2">
            <Sparkles className="size-4 text-[#0ea5e9] shrink-0" />
            <p className="text-[#0369a1] text-sm">
              This is a <span className="font-bold">free preview</span> of
              analytics using <span className="font-bold">sample data</span>.{" "}
              <Link
                href="/dashboard/billing"
                className="underline font-bold hover:text-[#0c4a6e]"
              >
                Upgrade
              </Link>{" "}
              to see your data in real-time and uncover themes.
            </p>
          </div>
        )}

        {/* THE UPDATED REAL-TIME CHART */}
        <BarChartTimeline data={activityData} isPro={userPlan} />
      </div>
    </div>
  );
};
