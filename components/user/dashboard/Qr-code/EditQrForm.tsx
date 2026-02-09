"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Globe, Layout, Copy, Zap } from "lucide-react";
import QRCode from "react-qr-code";
import Link from "next/link";
import { toast } from "sonner";
import { updateQrAction } from "@/server/users/users.action";
import { useEffect, useState } from "react";

interface EditQrFormProps {
  initialData: {
    userId: number;
    title: string | null;
    url: string;
    shortCode: string;
    type: string;
    clicks: number;
    isActive: boolean;
    isHidden: boolean;
    fgColor: string | null;
    bgColor: string | null;
    logoUrl: string | null;
  };
}

export const EditQrForm = ({ initialData }: EditQrFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      title: initialData.title || " ",
    },
  });

  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRedirectUrl(`${window.location.origin}/${initialData.shortCode}`);
  }, [initialData.shortCode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(redirectUrl);
    toast.success("Redirect link copied!");
  };

  const onSubmit = async (data: { title: string }) => {
    const res = await updateQrAction({
      shortCode: initialData.shortCode,
      title: data.title,
    });
    if (res.status === "success") {
      toast.success(res.message);
      reset();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT COLUMN: Settings */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Edit QR
            </h1>
            <p className="text-slate-500 font-medium">
              Configure your dynamic redirect and display name.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              {/* Section 1: Identity */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Layout size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest">
                    General Info
                  </h2>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Title
                  </Label>
                  <Input
                    {...register("title")}
                    className="h-12 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    placeholder="E.g., Winter Marketing Campaign"
                  />
                </div>
              </div>

              {/* Section 2: Destination */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-blue-600">
                  <Globe size={18} />
                  <h2 className="text-sm font-black uppercase tracking-widest">
                    Redirect Content
                  </h2>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-6">
                  {/* Permanent Short Link Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Zap
                          size={12}
                          className="text-amber-500 fill-amber-500"
                        />
                        Permanent Redirect Link
                      </Label>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        Static
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 group hover:border-blue-300 transition-all shadow-sm">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <Globe size={14} className="text-slate-500" />
                        </div>
                        <Link
                          href={redirectUrl}
                          target="_blank"
                          className="font-sans text-sm text-slate-600 truncate hover:text-blue-600 hover:underline transition-colors"
                        >
                          {redirectUrl}
                        </Link>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={copyToClipboard}
                        className="h-8 w-8 shrink-0 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Copy size={14} />
                      </Button>
                    </div>

                    <p className="text-[10px] text-slate-400 font-medium ml-1">
                      This is the URL encoded in your QR code. It cannot be
                      changed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              disabled={isSubmitting || !isDirty}
              className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
              <Save size={18} className="ml-2" />
            </Button>
          </form>
        </div>

        {/* RIGHT COLUMN: Live Preview Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-30">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-2 shadow-2xl">
            <div className="bg-slate-900 rounded-[2rem] p-8 flex flex-col items-center">
              {/* QR Smallened: p-6 -> p-4, size 240 -> 200 */}
              <div className="bg-white p-4 rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-500">
                <QRCode
                  value={initialData.url || "https://yourlink.com"}
                  size={200}
                  fgColor={initialData?.fgColor || "#000000"}
                  bgColor={initialData?.bgColor || "#ffffff"}
                  level="H"
                />
              </div>

              <div className="mt-8 w-full text-center space-y-3">
                <h3 className="text-white text-lg font-bold truncate px-4">
                  {initialData.title || "Your Title Here"}
                </h3>
                <div className="inline-block px-4 py-1.5 bg-slate-800 rounded-full border border-slate-700 text-blue-400 font-mono text-xs">
                  /{initialData?.shortCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
