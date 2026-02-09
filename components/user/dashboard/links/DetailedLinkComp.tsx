"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { shortLinkTable } from "@/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import {
  BarChart3,
  Pencil,
  QrCode,
  Lock,
  Globe,
  ExternalLink,
  Trash2,
  Plus,
  TrendingUp,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { handleDeleteAction } from "@/server/users/users.action";
import { toast } from "sonner";
import { PasswordModal } from "./PasswordModal";
import { ShareDialog } from "./ShareDialog";
import { title } from "process";

export type Shortlink = InferSelectModel<typeof shortLinkTable>;

interface DetailedLinksProps {
  links: Shortlink;
}

export const DetailedlinkComp = ({ links }: DetailedLinksProps) => {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const domain = getDomain(links.url);
  const faviconSrc = `https://unavatar.io/${domain}?fallback=false`;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImgError(false);
  }, [links?.url]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    }).format(date);
  };

  const shortUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${links.shortCode}`
      : `/${links.shortCode}`;

  const handleDelete = async (shortCode: string) => {
    const result = await handleDeleteAction(shortCode);

    if (result.status === "success") {
      toast.success(result.message);
      redirect("/dashboard/links");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-5 font-sans">
      {/* 1. HEADER SECTION */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center border p-1.5 shadow-sm">
                {imgError || !links?.url ? (
                  <Globe className="text-blue-500" size={22} />
                ) : (
                  <Image
                    src={faviconSrc}
                    alt="favicon"
                    width={28}
                    height={28}
                    className="rounded-md"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  {links.title || "Untitled Link"}
                </h1>
              </div>
            </div>

            <div className="space-y-1 font-sans">
              <div className="flex items-center gap-2">
                <a
                  href={shortUrl}
                  target="_blank"
                  className="text-blue-600 font-extrabold text-lg hover:underline flex items-center gap-1.5"
                >
                  {shortUrl} <ExternalLink size={14} />
                </a>
                <button
                  onClick={handleCopy}
                  className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <p className="text-slate-400 text-xs max-w-xl truncate">
                <span className="text-slate-300 font-bold uppercase text-[9px]">
                  Target:
                </span>{" "}
                {links.url}
              </p>
            </div>
          </div>

          <div className="flex gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 border-slate-200 transition-all"
              asChild
            >
              <Link href={`/dashboard/links/${links.shortCode}/edit`}>
                <Pencil size={16} />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:bg-red-50 hover:text-red-600 border-slate-200 transition-all"
              onClick={() => handleDelete(links.shortCode)}
            >
              <Trash2 size={16} />
            </Button>
            {/* Share Dialof functionality */}
            <ShareDialog shortUrl={shortUrl} title={title} />
          </div>
        </div>

        <div className="mt-6 pt-4 text-slate-400 text-[9px] font-black uppercase tracking-widest border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Link {links.isActive ? "Active" : "Deactive"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-300">CREATED:</span>
            <span className="text-slate-500">
              {mounted ? formatDate(new Date(links.createdAt)) : "..."}
            </span>
          </div>
        </div>
      </div>

      {/* 2. UTILITY CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* CARD A: QR CODE */}
        <Card className="border-slate-100 shadow-sm hover:border-blue-100 transition-all">
          <CardContent className="p-5 flex flex-col items-center justify-between h-full space-y-4">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                QR Code
              </h3>
              <QrCode size={14} className="text-slate-400" />
            </div>
            <div className="w-24 h-24 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center p-3">
              <QrCode size={32} className="text-slate-300" />
            </div>
            <Button
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700 font-bold h-9 rounded-lg text-xs"
            >
              <Plus size={14} className="mr-1.5" /> Create QR
            </Button>
          </CardContent>
        </Card>

        {/* CARD B: SECURITY */}
        <Card className="border-slate-100 shadow-sm hover:border-amber-100 transition-all">
          <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                  Security
                </h3>
                <Lock
                  size={14}
                  className={
                    links.password ? "text-amber-500" : "text-slate-400"
                  }
                />
              </div>
              <Badge
                variant="outline"
                className={`font-bold px-2 py-0 h-4 text-[8px] tracking-widest border-none ${
                  links.password
                    ? "bg-amber-50 text-amber-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {links.password ? "LOCKED" : "PUBLIC"}
              </Badge>
              <p className="text-[11px] text-slate-500 leading-snug font-medium">
                {links.password
                  ? "Requires a password to redirect."
                  : "Accessible to everyone publicly."}
              </p>
            </div>

            {/* PASSING DATA TO MODAL */}
            <PasswordModal
              shortCode={links.shortCode}
              hasPassword={!!links.password}
            />
          </CardContent>
        </Card>

        {/* CARD C: IMPROVED LINK PERFORMANCE (BG-WHITE) */}
        <Card className="border-slate-100 shadow-sm hover:border-emerald-100 bg-white transition-all">
          <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center justify-between w-full">
              <h3 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                Performance
              </h3>
              <TrendingUp size={14} className="text-emerald-500" />
            </div>

            <div className="flex items-end justify-between">
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Total Clicks
                </p>
                <span className="text-3xl font-black tracking-tight text-slate-900">
                  {links.clicks.toLocaleString()}
                </span>
              </div>
              {/* Mini Chart UI */}
              <div className="h-10 w-16 flex items-end gap-0.5">
                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-emerald-500/10 rounded-t-[1px] hover:bg-emerald-500 transition-all cursor-pointer"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            <Link href={"/dashboard/analytics"}>
              <Button
                variant="link"
                className="p-0 h-auto text-emerald-600 font-bold text-[10px] justify-start hover:no-underline group uppercase tracking-wider"
              >
                Full Analytics{" "}
                <ArrowUpRight
                  size={12}
                  className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* 3. ANALYTICS CHART SECTION */}
      <Card className="p-6 border-slate-100 shadow-sm bg-white rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Timeline
            </h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Link engagement trends
            </p>
          </div>
          <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-100">
            <Button
              variant="ghost"
              className="text-[9px] font-black h-7 px-3 rounded-md bg-white shadow-sm text-slate-900 uppercase"
            >
              7D
            </Button>
            <Button
              variant="ghost"
              className="text-[9px] font-black h-7 px-3 rounded-md text-slate-400 uppercase hover:text-slate-600"
            >
              30D
            </Button>
          </div>
        </div>
        <div className="h-48 bg-slate-50/50 rounded-xl flex flex-col items-center justify-center border border-dashed border-slate-200">
          <BarChart3 className="text-slate-200 mb-2" size={24} />
          <span className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em]">
            Gathering data...
          </span>
        </div>
      </Card>
    </div>
  );
};
