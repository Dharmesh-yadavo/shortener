"use client";
import { useState } from "react";
import { Link2, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { UrlShortener } from "./UrlShortener";
import { QrGenerator } from "./QrGenerator";
import { DashboardStats } from "./DashboardStats";

type UserData = {
  id: number;
  name: string;
  email: string;
  plan: string;
  linksCreated: number;
  qrsCreated: number;
  createdAt: Date;
  updatedAt: Date;
};

const Dashboard = ({ serverUser }: { serverUser: UserData }) => {
  const [mode, setMode] = useState("URL");

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-10 ">
      {/* main heading text */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {mode === "URL" ? "Shorten a long link" : "Create a QR Code"}
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Fast, reliable, and trackable links.
        </p>
      </div>

      {/* Pill box design here   */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 gap-3 rounded-full relative ">
          <button
            onClick={() => setMode("URL")}
            className={cn(
              "relative z-10 px-8 py-3 text-xs font-bold cursor-pointer transition-colors",
              mode === "URL" ? "text-blue-600" : "text-slate-500",
            )}
          >
            <div className="flex items-center gap-2">
              <Link2 size={14} /> Short Link
            </div>
            {mode === "URL" && (
              <motion.div
                layoutId="pill"
                className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
              />
            )}
          </button>
          <button
            onClick={() => setMode("QR")}
            className={cn(
              "relative z-10 px-8 py-3 text-xs font-bold cursor-pointer transition-colors",
              mode === "QR" ? "text-blue-600" : "text-slate-500",
            )}
          >
            <div className="flex items-center gap-2">
              <QrCode size={14} /> QR Code
            </div>
            {mode === "QR" && (
              <motion.div
                layoutId="pill"
                className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
              />
            )}
          </button>
        </div>
      </div>

      {/* shortLink and QR card toggle */}
      {mode === "URL" ? (
        <>
          <UrlShortener
            linksCreated={serverUser.linksCreated}
            plan={serverUser.plan}
            key="url"
          />
        </>
      ) : (
        <QrGenerator
          qrsCreated={serverUser.qrsCreated}
          plan={serverUser.plan}
          key="qr"
        />
      )}

      {/* stats of dashboard page */}
      <DashboardStats topLink="https://example.com/my-long-url" clicks={20} />
    </div>
  );
};

export default Dashboard;
