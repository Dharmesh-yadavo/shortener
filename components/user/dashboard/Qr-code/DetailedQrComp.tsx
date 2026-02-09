/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Palette,
  Pencil,
  Download,
  ExternalLink,
  Calendar,
  BarChart3,
  Lock,
} from "lucide-react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface QrDetailsPageProps {
  initialData: {
    title: string | null;
    url: string;
    shortCode: string;
    isActive: boolean;
    createdAt: Date;
    type: string;
    clicks: number;
    fgColor: string;
    bgColor: string;
    logoUrl: string | null;
  };
}

export const DetailedQrComp = ({ initialData }: QrDetailsPageProps) => {
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
                <a
                  href={fullShortUrl}
                  target="_blank"
                  className="text-blue-600 font-extrabold text-lg hover:underline flex items-center gap-1.5"
                >
                  {fullShortUrl} <ExternalLink size={14} />
                </a>
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
                    style={{ backgroundColor: initialData.bgColor }}
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
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          Scan data
          <Badge
            variant="outline"
            className="bg-slate-50 text-slate-500 font-medium"
          >
            <BarChart3 size={12} className="mr-1" /> {initialData.clicks} total
            scans
          </Badge>
        </h2>

        <Card className="p-8 relative overflow-hidden bg-white border-slate-200">
          <div className="flex justify-between items-center mb-12">
            <h3 className="font-bold text-slate-800">Scans over time</h3>
            <Button
              variant="outline"
              size="sm"
              className="text-slate-400 bg-slate-50 border-slate-200 cursor-not-allowed"
            >
              <Calendar size={14} className="mr-2" /> Time Period
            </Button>
          </div>

          {/* MOCK CHART BARS */}
          <div className="h-48 flex items-end gap-2 md:gap-4 relative">
            {/* Simple visual representation of bars like your image */}
            {[40, 70, 45, 90, 65, 80, 30, 100, 50, 60, 85, 40, 20, 95, 30].map(
              (height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-cyan-400 rounded-t-sm transition-all hover:bg-cyan-500 cursor-pointer"
                  style={{ height: `${height}%` }}
                />
              ),
            )}

            {/* UPGRADE OVERLAY (Matching your image) */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
              <Button className="bg-slate-800 hover:bg-slate-900 text-white rounded-full px-6 shadow-xl">
                <Lock size={14} className="mr-2" /> Upgrade
              </Button>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4 flex justify-between text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            <span>Jan 15</span>
            <span>Feb 04</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
