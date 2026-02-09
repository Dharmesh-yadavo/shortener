/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react"; // Added for hydration fix
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import {
  Palette,
  RotateCcw,
  Save,
  ImageIcon,
  Pipette,
  Link as LinkIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { updateQrCustomizationAction } from "@/server/users/users.action";

interface CustomizeQrProps {
  initialData: {
    userId: number;
    linkId: number;
    shortCode: string;
    url: string;
    fgColor: string | null;
    bgColor: string | null;
    title: string | null;
    logoUrl?: string | null;
  };
}

const PRESET_COLORS = [
  "#000000",
  "#2563eb",
  "#db2777",
  "#059669",
  "#7c3aed",
  "#ea580c",
];
const PRESET_BG = ["#ffffff", "#f8fafc", "#f0f9ff", "#fff7ed", "#fdf2f8"];

export const CustomizeQrForm = ({ initialData }: CustomizeQrProps) => {
  const [mounted, setMounted] = useState(false); // Fix for hydration

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      fgColor: initialData.fgColor || "#000000",
      bgColor: initialData.bgColor || "#ffffff",
      logoUrl: initialData.logoUrl || "",
    },
  });

  const watchFg = watch("fgColor");
  const watchBg = watch("bgColor");
  const watchLogo = watch("logoUrl");

  // Fix for "window is not defined" error
  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: {
    fgColor: string;
    bgColor: string;
    logoUrl: string;
  }) => {
    try {
      // 1. Call your server action with the form data and the unique shortCode
      const res = await updateQrCustomizationAction({
        linkId: initialData.linkId,
        fgColor: data.fgColor,
        bgColor: data.bgColor,
        logoUrl: data.logoUrl,
      });

      // 2. Handle the response
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error saving customization:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT: Unified Customization Panel */}
        <div className="lg:col-span-7 space-y-8">
          <header>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              QR Studio
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Customize your colors and branding in one place.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8">
              {/* SECTION 1: COLORS */}
              <Card className="p-8 border-slate-200 shadow-sm rounded-3xl bg-white space-y-8">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Palette size={20} />
                  <h2 className="font-bold uppercase tracking-widest text-sm">
                    Visual Style
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <Label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                      Pattern Color
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() =>
                            setValue("fgColor", color, { shouldDirty: true })
                          }
                          className={`w-7 h-7 rounded-full border-2 transition-all ${watchFg === color ? "border-blue-500 scale-110" : "border-transparent"}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <div className="relative w-7 h-7">
                        <input
                          type="color"
                          value={watchFg}
                          onChange={(e) =>
                            setValue("fgColor", e.target.value, {
                              shouldDirty: true,
                            })
                          }
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                        <div className="w-full h-full rounded-full border border-slate-200 flex items-center justify-center bg-white text-slate-400">
                          <Pipette size={12} />
                        </div>
                      </div>
                    </div>
                    <Input
                      {...register("fgColor")}
                      className="font-mono bg-slate-50 border-none h-11 rounded-xl"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                      Background Color
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_BG.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() =>
                            setValue("bgColor", color, { shouldDirty: true })
                          }
                          className={`w-7 h-7 rounded-full border-2 shadow-xs transition-all ${watchBg === color ? "border-blue-500 scale-110" : "border-slate-200"}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      <div className="relative w-7 h-7">
                        <input
                          type="color"
                          value={watchBg}
                          onChange={(e) =>
                            setValue("bgColor", e.target.value, {
                              shouldDirty: true,
                            })
                          }
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                        <div className="w-full h-full rounded-full border border-slate-200 flex items-center justify-center bg-white text-slate-400">
                          <Pipette size={12} />
                        </div>
                      </div>
                    </div>
                    <Input
                      {...register("bgColor")}
                      className="font-mono bg-slate-50 border-none h-11 rounded-xl"
                    />
                  </div>
                </div>
              </Card>

              {/* SECTION 2: BRANDING */}
              <Card className="p-8 border-slate-200 shadow-sm rounded-3xl bg-white space-y-6">
                <div className="flex items-center gap-2 text-blue-600">
                  <ImageIcon size={20} />
                  <h2 className="font-bold uppercase tracking-widest text-sm">
                    Branding
                  </h2>
                </div>
                <div className="space-y-4">
                  <Label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    Center Logo URL
                  </Label>
                  <div className="relative">
                    <LinkIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <Input
                      {...register("logoUrl")}
                      placeholder="https://example.com/logo.png"
                      className="pl-10 h-12 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex items-center gap-4">
              <Button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg flex-1 transition-transform active:scale-95"
              >
                {isSubmitting ? "Processing..." : "Save Customization"}
                <Save size={18} className="ml-2" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => reset()}
                disabled={!isDirty}
                className="h-14 px-6 text-slate-400 font-bold rounded-2xl"
              >
                <RotateCcw size={18} />
              </Button>
            </div>
          </form>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="lg:col-span-5 lg:sticky lg:top-40">
          <Card className="bg-slate-900 border-none rounded-[3rem] p-1 shadow-2xl overflow-hidden">
            <div className="bg-slate-800/50 rounded-[2.8rem] p-10 flex flex-col items-center">
              {/* QR Container with Logo Overlay */}
              <div
                className="p-6 rounded-[2rem] shadow-2xl relative flex items-center justify-center transition-all duration-500"
                style={{ backgroundColor: watchBg }}
              >
                <QRCode
                  id="qr-code-download"
                  value={initialData.url}
                  size={220}
                  fgColor={watchFg}
                  bgColor={watchBg}
                  level="H"
                />

                {/* LOGO FIX: Use an HTML img tag, NOT an SVG image tag */}
                {watchLogo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="rounded-lg shadow-md overflow-hidden w-12 h-12 flex items-center justify-center"
                      style={{ backgroundColor: watchBg }} // Matches QR background
                    >
                      <img
                        src={watchLogo}
                        alt="center logo"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 w-full text-center space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                  Preview
                </p>
                <h3 className="text-white text-xl font-bold truncate px-4">
                  {initialData.title || "Your Campaign"}
                </h3>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
