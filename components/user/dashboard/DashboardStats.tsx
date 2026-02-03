"use client";
import { Trophy, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export const DashboardStats = ({
  topLink,
  clicks,
}: {
  topLink: string;
  clicks: number;
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-center gap-4"
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <Trophy className="text-orange-300" size={20} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Top Performing Link
          </p>
          <div className="flex flex-row items-center justify-end w-full gap-4">
            <Link
              href={topLink ? topLink : "https://example.com/my-long-url"}
              className="font-bold text-slate-900 truncate flex-1 hover:underline"
            >
              {topLink ? topLink : "https://example.com/my-long-url"}
            </Link>
            <span className="text-orange-400 font-bold text-sm whitespace-nowrap shrink-0">
              {clicks ? clicks.toLocaleString() : 0} Clicks
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
