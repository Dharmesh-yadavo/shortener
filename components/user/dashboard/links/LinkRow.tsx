import {
  CheckCircle2,
  Copy,
  Edit,
  Globe,
  MousePointerClick,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DropDownAction } from "./DropDownAction";

interface LinkRowProps {
  title: string;
  url: string;
  shortUrl: string;
  clicks: number;
  shortCode: string;
  date: string;
  status: "Active" | "Inactive";
}

export const LinkRow = ({
  title,
  url,
  shortUrl,
  clicks,
  shortCode,
  date,
  // status,
}: LinkRowProps) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const domain = getDomain(url);
  const faviconSrc = `https://unavatar.io/${domain}?fallback=false`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImgError(false);
  }, [url]);

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
            {imgError || !url ? (
              <Globe size={20} />
            ) : (
              <Image
                src={faviconSrc}
                alt="favicon"
                width={28}
                height={28}
                onError={() => setImgError(true)}
              />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-sm truncate">
                {`${title} - Untitled`}
              </span>
              <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
            </div>
            <span className="text-xs font-sans text-slate-400 truncate max-w-60 mt-0.5">
              {url}
            </span>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-2">
          <Link
            href={shortUrl}
            className="text-xs font-bold font-sans text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:underline"
          >
            {shortUrl}
          </Link>
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
          <span className="text-[10px] font-sans text-slate-400 font-bold uppercase tracking-wider mt-1">
            {date}
          </span>
        </div>
      </td>
      <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-1 ">
          <button
            className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
            title="View Analytics"
          >
            <Edit size={18} />
          </button>
          <button
            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Delete Link"
          >
            <Trash2 size={18} />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-2" />
          <DropDownAction linkId={shortCode} />
        </div>
      </td>
    </motion.tr>
  );
};
