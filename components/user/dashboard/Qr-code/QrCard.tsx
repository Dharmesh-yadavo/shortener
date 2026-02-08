"use client";

import {
  Download,
  MoreHorizontal,
  MousePointer2,
  Link as LinkIcon,
  Pencil,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { useRef } from "react";
import Link from "next/link";
import { QrDropDownAction } from "./QrDropDownAction";

type QrItem = {
  userId: number;
  title: string | null;
  url: string;
  shortCode: string;
  clicks: number;
  isActive: boolean;
  isHidden: boolean;
  fgColor: string | null;
  bgColor: string | null;
  logoUrl: string | null;
};

export const QrCard = ({
  title,
  shortCode,
  fgColor,
  bgColor,
  url,
  clicks,
  isHidden,
}: QrItem) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${shortCode}`
      : shortCode;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all flex flex-col md:flex-row gap-10 items-start md:items-center"
    >
      {/* 1. Left: QR Preview (Small & Square) */}
      <div
        ref={qrRef}
        className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm shrink-0"
      >
        <QRCode
          value={fullUrl}
          size={80}
          fgColor={fgColor || "#000000"}
          bgColor={bgColor || "#ffffff"}
          level="H"
        />
      </div>

      {/* 2. Middle: Info Section (Grows to fill space) */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-wider">
            QR Code
          </span>
          <h3 className="text-lg font-bold text-slate-900 truncate">{title}</h3>
        </div>

        <div className="flex items-center gap-2   transition-all">
          <LinkIcon size={14} />
          <p className="text-sm truncate font-medium font-sans">{url}</p>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
            <MousePointer2 size={12} className="text-slate-400" />
            <span className="text-xs font-bold font-sans text-slate-700">
              {clicks} scans
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <LinkIcon size={12} />
            <Link href={fullUrl}>
              <span className="text-xs text-blue-500 font-sans font-bold hover:underline hover:text-blue-700 ">
                {window.location.host}/{shortCode}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Right: Action Icons */}
      <div className="flex items-center gap-1 md:gap-2 shrink-0 self-end md:self-center">
        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Pencil size={18} />
        </button>
        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Download size={18} />
        </button>
        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <BarChart3 size={18} />
        </button>
        <QrDropDownAction shortCode={shortCode} currentState={isHidden} />
      </div>
    </motion.div>
  );
};
