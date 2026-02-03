import {
  BarChart2,
  CheckCircle2,
  Copy,
  Globe,
  MoreHorizontal,
  MousePointerClick,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const LinkRow = ({
  title,
  url,
  shortUrl,
  clicks,
  date,
  status,
}: unknown) => {
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
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-500 transition-all shadow-sm">
            <Globe size={20} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm truncate">
                {title}
              </span>
              <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
            </div>
            <span className="text-xs text-slate-400 truncate max-w-[240px] mt-0.5">
              {url}
            </span>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-2">
          <code className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
            {shortUrl}
          </code>
          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all active:scale-90"
          >
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-slate-900 font-black text-sm">
            <MousePointerClick size={14} className="text-blue-500" />
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
