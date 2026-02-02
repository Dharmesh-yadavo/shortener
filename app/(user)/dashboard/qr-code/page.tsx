"use client";

import { useState } from "react";
import { Search, Plus, Filter, Grid, List as ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { QrCard } from "@/components/user/dashboard/QrCard";

const categories = ["All Codes", "Personal", "Marketing", "Events"];

export default function QrGallery() {
  const [activeTab, setActiveTab] = useState("All Codes");

  // Mock data for mapping
  const [qrCodes] = useState([
    {
      id: 1,
      title: "Summer Campaign",
      shortUrl: "short.io/summer-2024",
      scans: 1240,
      type: "DYNAMIC",
      color: "#4ade80",
    },
    {
      id: 2,
      title: "Personal Business Card",
      shortUrl: "short.io/vcard-jane",
      scans: 458,
      type: "VCARD",
      color: "#fcd34d",
    },
    {
      id: 3,
      title: "Restaurant Menu",
      shortUrl: "short.io/menu-qr",
      scans: 8920,
      type: "STATIC",
      color: "#f1f5f9",
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            QR Code Gallery
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage and track your custom QR codes.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-blue-500/20">
          <Plus size={20} className="mr-2" /> Create New QR
        </Button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-100 pb-4">
        <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap",
                activeTab === tab
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <Input
            placeholder="Search codes..."
            className="pl-10 h-10 bg-white border-slate-200 rounded-xl"
          />
        </div>
      </div>

      {/* QR Grid */}
      <div className="grid grid-cols-1 mx-w-5xl sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {qrCodes.map((qr) => (
          <QrCard key={qr.id} {...qr} />
        ))}
      </div>
    </div>
  );
}
