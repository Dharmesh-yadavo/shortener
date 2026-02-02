"use client";

import { useState } from "react";
import {
  Copy,
  BarChart2,
  Trash2,
  Globe,
  MousePointerClick,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const LinkTable = ({ title, url, shortUrl, clicks, date }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.tr
      layout
      className="group hover:bg-slate-50/80 transition-all duration-200"
    >
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-sm group-hover:bg-white group-hover:text-emerald-500 transition-all">
            <Globe size={20} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-slate-900 text-sm truncate">
              {title}
            </span>
            <span className="text-xs text-slate-400 truncate max-w-[200px] mt-0.5">
              {url}
            </span>
          </div>
        </div>
      </td>

      <td className="px-8 py-6">
        <div className="flex items-center gap-2">
          <code className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100/50">
            {shortUrl}
          </code>
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-300 hover:text-emerald-500 transition-colors"
          >
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </td>

      <td className="px-8 py-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-slate-900 font-black text-sm">
            <MousePointerClick size={14} className="text-emerald-500" />
            {clicks ? clicks.toLocaleString() : 0}
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
            {date}
          </span>
        </div>
      </td>

      {/* Actions: Always Visible */}
      <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all"
                >
                  <BarChart2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-[10px] font-bold">Analytics</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 shadow-sm transition-all"
                >
                  <Trash2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-[10px] font-bold uppercase">Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </td>
    </motion.tr>
  );
};
