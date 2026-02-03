"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkRow } from "@/components/user/dashboard/links/LinkRow";

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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <Input
              placeholder="Filter by title or URL..."
              className="pl-10 h-11 bg-white border-slate-200 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 rounded-xl transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-blue-400 hover:bg-blue-500 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-blue-500/20 flex gap-2 active:scale-95 transition-all">
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

export default LinkLibrary;
