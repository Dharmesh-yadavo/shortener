"use client";
import { Link as LinkIcon, Zap, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { shortLinkAction } from "@/server/users/users.action";

import {
  shortenerSchema,
  shortenerUserData,
} from "@/server/users/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UrlDialogComp } from "./UrlDialogComp";

export const UrlShortener = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(shortenerSchema),
  });

  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = async (data: shortenerUserData) => {
    console.log(data);
    const result = await shortLinkAction(data);

    if (result.status === "success") {
      toast.success(result.message);
      const fullUrl = `${window.location.origin}/${result.data?.shortCode}`;
      setGeneratedLink(fullUrl);
      setIsOpen(true);
      reset();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 block">
            Enter your destination URL
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LinkIcon
                  className={`text-slate-400 ${errors.url ? "text-red-400" : ""}`}
                  size={20}
                />
              </div>
              <Input
                type="text" // Change from "url" to "text" if you want Zod to handle the error message instead of the browser
                {...register("url")}
                className={`w-full h-12 pl-11 rounded-md border-slate-200 ${
                  errors.url
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-blue-500 focus-visible:ring-blue-500"
                }`}
                placeholder="https://example.com/my-long-url"
              />
              {/* Moved inside the relative container and adjusted positioning */}
              {errors.url && (
                <p className="text-red-500 text-xs mt-2 absolute left-0 -bottom-6 font-medium">
                  {errors.url.message as string}
                </p>
              )}
            </div>
            <Button
              disabled={isSubmitting}
              className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-sm transition-all active:scale-95 disabled:opacity-70"
            >
              {isSubmitting ? "Shortening..." : "Shorten Link"}
            </Button>
          </div>
        </div>
      </form>

      <UrlDialogComp
        open={isOpen}
        onOpenChange={setIsOpen}
        generatedLink={generatedLink}
      />

      {/* Footer for Links */}
      <div className="flex items-center justify-between mt-8 border-t border-slate-50">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="w-4 h-4 rounded bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">
            i
          </div>
          <span>
            You can create <strong className="text-slate-900">10 more</strong>{" "}
            links this month.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
            <Zap size={12} fill="currentColor" /> <span>Instant</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
            <History size={12} /> <span>History</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
