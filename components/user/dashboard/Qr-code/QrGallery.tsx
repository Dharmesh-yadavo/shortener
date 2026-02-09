"use client";

import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCard } from "./QrCard";
import { useState } from "react";
import Link from "next/link";

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

interface QrGalleryProps {
  qrs: QrItem[];
}

export default function QrGallery({ qrs }: QrGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewFilter, setViewFilter] = useState<"active" | "hidden">("active");

  const filteredQr = qrs.filter((qr) => {
    const matchesSearch =
      qr.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (qr.title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesVisibility =
      viewFilter === "active" ? !qr.isHidden : qr.isHidden;

    return matchesSearch && matchesVisibility;
  });
  //

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            QR Gallery
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage and track your custom QR codes.
          </p>
        </div>
        <Link href={"/dashboard/qr-code/create"}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-blue-500/20">
            <Plus size={20} className="mr-2" /> Create New QR
          </Button>
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col justify-cneter sm:flex-row justify-end items-start sm:items-center gap-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewFilter("active")}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                viewFilter === "active"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setViewFilter("hidden")}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                viewFilter === "hidden"
                  ? "bg-white text-amber-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Hidden
            </button>
          </div>
          <div className="relative group flex-1 sm:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <Input
              placeholder="Filter by URL..."
              className="pl-10 h-11 bg-white border-slate-200 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 rounded-xl transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* QR Card */}
      <div className="flex flex-col gap-4 max-w-5xl mx-auto p-6">
        {filteredQr.length > 0 ? (
          filteredQr.map((qr) => <QrCard key={qr.shortCode} {...qr} />)
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">
              No QR codes found matching your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
