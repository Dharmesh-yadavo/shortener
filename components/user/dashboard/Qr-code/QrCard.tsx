"use client";

import { QrCode, Download, Share2, Eye, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const QrCard = ({ title, shortUrl, scans, type, color }: any) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all overflow-hidden group"
    >
      {/* 1. Smaller Preview Area */}
      <div className="p-4 pb-0">
        <div
          className="aspect-square w-full rounded-xl flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: color + "15" }}
        >
          {/* Main QR Icon - Scaled down */}
          <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-50">
            <QrCode size={64} className="text-slate-800" />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button className="bg-white p-1.5 rounded-lg text-slate-900 hover:text-blue-600 transition-colors shadow-lg">
              <Download size={14} />
            </button>
            <button className="bg-white p-1.5 rounded-lg text-slate-900 hover:text-blue-600 transition-colors shadow-lg">
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Compact Content Area */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {title}
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate mt-0.5">
              {shortUrl}
            </p>
          </div>
          <button className="text-slate-300 hover:text-slate-600 transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>

        {/* 3. Tighter Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="flex items-center gap-1.5">
            <Eye size={12} className="text-slate-400" />
            <span className="text-[11px] font-bold text-slate-600">
              {scans.toLocaleString()} scans
            </span>
          </div>

          <span
            className={cn(
              "text-[9px] font-black px-1.5 py-0.5 rounded tracking-widest uppercase",
              type === "DYNAMIC"
                ? "bg-blue-50 text-blue-600"
                : type === "VCARD"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-500",
            )}
          >
            {type}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
