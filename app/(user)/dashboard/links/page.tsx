"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Copy,
  BarChart2,
  Trash2,
  Filter,
  MoreHorizontal,
  MousePointerClick,
  Globe,
  Calendar,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const LinkLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
      {/* --- Advanced Header --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Link Library
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage, monitor, and optimize your touchpoints.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative group flex-1 sm:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
              size={18}
            />
            <Input
              placeholder="Filter by title or URL..."
              className="pl-10 h-11 bg-white border-slate-200 focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 rounded-xl transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-[#10b981] hover:bg-[#059669] text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-emerald-500/20 flex gap-2 active:scale-95 transition-all">
            <Plus size={20} />{" "}
            <span className="hidden sm:inline">New Link</span>
          </Button>
        </div>
      </div>

      {/* --- Data Table Container --- */}
      <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/30">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Asset Name & Path
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Short Link
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Performance
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <LinkRow
                title="Summer Campaign 2024"
                url="https://store.brand.com/products/seasonal-sale-items-july"
                shortUrl="shorten.io/summer-sale"
                clicks={12840}
                date="2 days ago"
                status="Active"
              />
              <LinkRow
                title="Social Bio Link"
                url="https://linktree.com/alexdesigner"
                shortUrl="shorten.io/twitter-bio"
                clicks={4520}
                date="1 month ago"
                status="Active"
              />
            </tbody>
          </table>
        </div>

        {/* --- Pagination Footer --- */}
        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">
            Showing 1-10 of 42 links
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 rounded-lg text-xs font-bold border-slate-200"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-4 rounded-lg text-xs font-bold border-slate-200 text-slate-900 bg-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Link Row Component ---
const LinkRow = ({ title, url, shortUrl, clicks, date, status }: unknown) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group hover:bg-slate-50/80 transition-all cursor-default"
    >
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-emerald-500 transition-all shadow-sm">
            <Globe size={20} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm truncate">
                {title}
              </span>
              <CheckCircle2
                size={14}
                className="text-emerald-500 flex-shrink-0"
              />
            </div>
            <span className="text-xs text-slate-400 truncate max-w-[240px] mt-0.5">
              {url}
            </span>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-2">
          <code className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
            {shortUrl}
          </code>
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all active:scale-90"
          >
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-slate-900 font-black text-sm">
            <MousePointerClick size={14} className="text-emerald-500" />
            {clicks.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
            {date}
          </span>
        </div>
      </td>
      <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-1 ">
          <button
            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            title="View Analytics"
          >
            <BarChart2 size={18} />
          </button>
          <button
            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Delete Link"
          >
            <Trash2 size={18} />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-2" />
          <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-all">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default LinkLibrary;
