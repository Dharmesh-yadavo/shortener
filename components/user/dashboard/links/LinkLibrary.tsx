"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkRow } from "@/components/user/dashboard/links/LinkRow";
import { InferSelectModel } from "drizzle-orm";
import { shortLinkTable } from "@/drizzle/schema";
import Link from "next/link";

// Type definition
export type ShortLink = InferSelectModel<typeof shortLinkTable>;

interface LinkLibraryProps {
  links: ShortLink[];
}

export const LinkLibrary = ({ links }: LinkLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // TypeScript now knows 'link' has 'url' and other properties
  const filteredLinks = links.filter((link) =>
    link.url.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-8">
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
              placeholder="Filter by URL..."
              className="pl-10 h-11 bg-white border-slate-200 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 rounded-xl transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href={"/dashboard/links/create"}>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-blue-500/20 flex gap-2 active:scale-95 transition-all">
              <Plus size={20} />{" "}
              <span className="hidden sm:inline">Create Link</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* --- Data Table Container --- */}
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xs overflow-hidden">
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
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link) => (
                  <LinkRow
                    key={link.id}
                    title={
                      link.title
                        ? link.title
                        : new URL(link.url).hostname.replace("www.", "") +
                          " - Untitled"
                    }
                    url={link.url}
                    shortUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/${link.shortCode}`}
                    clicks={link.clicks}
                    shortCode={link.shortCode}
                    date={new Date(link.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                    currentState={link.isHidden}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-8 py-10 text-center text-slate-400"
                  >
                    No links found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- Pagination Footer --- */}
        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">
            Showing {filteredLinks.length} of {links.length} links
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
