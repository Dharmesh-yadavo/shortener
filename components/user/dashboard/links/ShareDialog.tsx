"use client";

import { useState } from "react";
import {
  Check,
  MessageCircle,
  Share2,
  Twitter,
  Linkedin,
  Instagram,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function ShareDialog({
  shortUrl,
  title,
}: {
  shortUrl: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="h-6 w-6 text-[#25D366]" />,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ": " + shortUrl)}`,
    },
    {
      name: "X",
      icon: <Twitter className="h-6 w-6 text-black" />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shortUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-6 w-6 text-[#0A66C2]" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shortUrl)}`,
    },
    {
      name: "Telegram",
      icon: <Send className="h-6 w-6 text-[#0088cc]" />, // Swap with Telegram icon
      href: `https://t.me/share/url?url=${encodeURIComponent(shortUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-6 w-6 text-[#E4405F]" />,
      // Instagram doesn't have a direct share link for external URLs.
      // This is a common fallback that opens the app's story/direct section.
      href: `https://www.instagram.com/`,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(shortUrl);
        toast.info(
          "Instagram doesn't support direct links. Link copied to clipboard—paste it in your Bio or Story!",
        );
      },
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-9 px-4 text-slate-600 font-bold hover:bg-blue-50 hover:text-blue-600 border-slate-200 transition-all"
        >
          <Share2 size={16} className="mr-2" /> Share
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-120  rounded-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-black text-slate-900">
            Share your Link
          </DialogTitle>
        </DialogHeader>

        {/* Social Icons Grid */}
        <div className="flex items-center justify-between py-6 gap-2">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group transition-transform active:scale-95"
            >
              <div className="h-14 w-14 rounded-full border border-slate-100 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-blue-100 transition-all">
                {option.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                {option.name}
              </span>
            </a>
          ))}
        </div>

        {/* Copy Link Section */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <Input
            readOnly
            value={shortUrl}
            className="border-none bg-transparent shadow-none focus-visible:ring-0 font-bold text-slate-600 truncate"
          />
          <Button
            size="sm"
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 font-bold px-6 rounded-lg h-9 shadow-md transition-all active:scale-95"
          >
            {copied ? <Check size={16} /> : "Copy"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
