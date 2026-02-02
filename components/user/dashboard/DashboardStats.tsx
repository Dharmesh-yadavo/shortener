"use client";
import { Trophy, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export const DashboardStats = ({
  topLink,
  clicks,
}: {
  topLink: string;
  clicks: number;
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-8">
      {/* Top Performing Link Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#EFFFF9] border border-[#30e8ab]/20 rounded-xl p-5 flex items-center gap-4"
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <Trophy className="text-[#30e8ab]" size={20} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Top Performing Link
          </p>
          {/* Added w-full and items-center to ensure the row fills the space */}
          <div className="flex flex-row items-center justify-end w-full gap-4">
            {/* flex-1 allows the link to take up all available middle space */}
            <span className="font-bold text-slate-900 truncate flex-1">
              {topLink ? topLink : "https://example.com/my-long-url"}
            </span>
            {/* whitespace-nowrap and flex-shrink-0 keeps the clicks on one line at the end */}
            <span className="text-[#30e8ab] font-bold text-sm whitespace-nowrap shrink-0">
              {clicks ? clicks.toLocaleString() : 0} Clicks
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
