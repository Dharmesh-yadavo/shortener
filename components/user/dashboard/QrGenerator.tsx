"use client";
import { QrCode, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export const QrGenerator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <label className="text-sm font-bold text-slate-700 block">
          Enter text or URL for QR code
        </label>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <QrCode className="text-slate-400" size={20} />
            </div>
            <Input
              className="w-full h-12 pl-11 rounded-md border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="Your website or text..."
            />
          </div>
          <Button className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-sm transition-all active:scale-95">
            Generate QR
          </Button>
        </div>
      </div>

      {/* Unique Footer for QR */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-4 h-4 rounded bg-purple-50 text-purple-600 flex items-center justify-center text-[10px] font-bold">
            i
          </div>
          <span>
            QR codes this month: <strong className="text-slate-900">0/5</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-widest transition-colors">
            <Download size={12} /> Download
          </button>
          <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-widest transition-colors">
            <Share2 size={12} /> Share
          </button>
        </div>
      </div>
    </motion.div>
  );
};
