"use client";
import { QrCode, Download, Share2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  shortenerSchema,
  shortenerUserData,
} from "@/server/users/users.schema";
import { toast } from "sonner";
import { qrCodeAction } from "@/server/users/users.action";
import { useState } from "react";
import { QrDialogComp } from "./QrDialogComp";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const QrGenerator = ({
  qrsCreated = 0,
  plan,
}: {
  qrsCreated: number;
  plan: "pro" | "business" | "free" | null;
}) => {
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(shortenerSchema),
  });

  const onSubmit = async (data: shortenerUserData) => {
    // console.log(data);
    const result = await qrCodeAction(data);

    if (result.status === "success" && "data" in result) {
      toast.success(result.message);
      const fullUrl = `${window.location.origin}/${result.data?.shortCode}`;
      setGeneratedLink(fullUrl);
      setIsOpen(true);
      reset();
    } else {
      toast.error(result.message);
    }
  };

  let MAX_LINKS: number | "unlimited" = 0;
  if (plan === "free") MAX_LINKS = 5;
  else if (plan === "pro") MAX_LINKS = 30;
  else if (plan === "business") MAX_LINKS = "unlimited";

  const remainingLinks =
    MAX_LINKS === "unlimited" ? null : Math.max(0, MAX_LINKS - qrsCreated);

  const isLimitReached = MAX_LINKS !== "unlimited" && remainingLinks === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-700 block ">
            Enter text or URL for QR code
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <QrCode className="text-slate-400" size={20} />
              </div>
              <Input
                type="text"
                {...register("url")}
                className={`w-full h-12 pl-11 rounded-md border-slate-200 ${
                  errors.url
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-blue-500 focus-visible:ring-blue-500"
                }`}
                placeholder="https://example.com/my-long-url"
              />
              {errors.url && (
                <p className="text-red-500 text-xs mt-2 absolute left-0 -bottom-6 font-medium">
                  {errors.url.message as string}
                </p>
              )}
            </div>
            <Button
              disabled={isSubmitting}
              className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-sm transition-all active:scale-95"
            >
              {isSubmitting ? "Generating..." : "Generate QR"}
            </Button>
          </div>
        </div>

        <QrDialogComp
          open={isOpen}
          onOpenChange={setIsOpen}
          generatedLink={generatedLink}
        />

        {/* Footer for QR */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
          <div className="flex items-center gap-3">
            {isLimitReached ? (
              /* LIMIT REACHED STATE */
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2"
              >
                <div className="px-2 py-1 rounded bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider">
                  Limit Reached
                </div>
                <Link href="/subscription">
                  <button className="text-xs font-sans cursor-pointer font-bold text-blue-600 hover:underline flex items-center gap-1">
                    Upgrade to create more <Zap size={12} fill="currentColor" />
                  </button>
                </Link>
              </motion.div>
            ) : (
              /* ACTIVE USAGE STATE */
              <div className="flex items-center gap-2 text-xs font-sans text-slate-500">
                <div
                  className={cn(
                    "w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold",
                    MAX_LINKS === "unlimited"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-purple-50 text-purple-600",
                  )}
                >
                  {MAX_LINKS === "unlimited" ? "∞" : "i"}
                </div>
                <span>
                  {MAX_LINKS === "unlimited" ? (
                    <>
                      You have{" "}
                      <strong className="text-slate-900">Unlimited</strong> QR
                      code this month. Enjoy!
                    </>
                  ) : (
                    <>
                      You can create{" "}
                      <strong className="text-slate-900">
                        {remainingLinks}
                      </strong>{" "}
                      more QR Code this month.
                    </>
                  )}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-widest transition-colors">
              <Download size={12} /> Download
            </button>
            <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 uppercase tracking-widest transition-colors">
              <Share2 size={12} /> Share
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};
