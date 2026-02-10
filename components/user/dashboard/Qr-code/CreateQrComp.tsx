/* eslint-disable @next/next/no-img-element */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import {
  Palette,
  Link2,
  Layout,
  Sparkles,
  Pipette,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { CreateQrData, createQrSchema } from "@/server/users/users.schema";
import { createQrAction } from "@/server/users/users.action";

const PRESET_COLORS = ["#000000", "#2563eb", "#dc2626", "#16a34a", "#7c3aed"];
const PRESET_BG = ["#ffffff", "#f8fafc", "#f1f5f9", "#fff7ed", "#f0fdf4"];

export const CreateQrComp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateQrData>({
    resolver: zodResolver(createQrSchema),
    defaultValues: {
      url: "",
      title: "",
      fgColor: "#000000",
      bgColor: "#ffffff",
      logoUrl: "",
    },
  });

  // Watch values for real-time preview
  const watchUrl = watch("url");
  const watchTitle = watch("title");
  const watchFg = watch("fgColor");
  const watchBg = watch("bgColor");
  const watchLogo = watch("logoUrl");

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return "dynamic-link.io";
    }
  };

  const onSubmit = async (data: CreateQrData) => {
    try {
      const res = await createQrAction({ data });

      if (res.status === "success") {
        toast.success(res.message);
        reset();
        redirect("/dashboard/qr-code");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error saving customization:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="flex flex-col mb-10 space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Create Dynamic QR
        </h1>
        <p className="text-slate-500 font-medium text-lg">
          Generate a trackable QR code that you can edit anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Editor */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-7 space-y-8"
        >
          {/* Section 1: Destination */}
          <Card className="border-slate-200 shadow-sm overflow-hidden rounded-2xl">
            <CardHeader className="py-4 px-6 bg-slate-50/50 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-blue-600" />
                <CardTitle className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  Destination
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-900">
                  Target URL
                </Label>
                <Input
                  {...register("url")}
                  placeholder="https://your-destination.com"
                  className="h-12 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
                {errors.url && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.url.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-900">
                  QR Title (Internal)
                </Label>
                <Input
                  {...register("title")}
                  placeholder="e.g. Summer Campaign 2026"
                  className="h-12 border-slate-200 rounded-xl"
                />
                {errors.title && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Visual Style */}
          <Card className="p-8 border-slate-200 shadow-sm rounded-2xl bg-white space-y-8">
            <div className="flex items-center gap-2 text-blue-600">
              <Palette size={20} />
              <h2 className="font-bold uppercase tracking-widest text-xs">
                Visual Style
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Foreground Color */}
              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                  Pattern Color
                </Label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setValue("fgColor", color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${watchFg === color ? "border-blue-500 scale-110 shadow-md" : "border-transparent"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <div className="relative w-8 h-8 group">
                    <input
                      type="color"
                      value={watchFg}
                      onChange={(e) => setValue("fgColor", e.target.value)}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />

                    <div className="w-full h-full rounded-full border border-slate-200 flex items-center justify-center bg-white text-slate-400 group-hover:bg-slate-50 transition-colors">
                      <Pipette size={14} />
                    </div>
                  </div>
                </div>
                <Input
                  {...register("fgColor")}
                  className="font-mono bg-slate-50 border-none h-10 rounded-lg"
                />
                {errors.fgColor && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.fgColor.message}
                  </p>
                )}
              </div>

              {/* Background Color */}
              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                  Background Color
                </Label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_BG.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setValue("bgColor", color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${watchBg === color ? "border-blue-500 scale-110 shadow-md" : "border-slate-200"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <div className="relative w-8 h-8 group">
                    <input
                      type="color"
                      value={watchBg}
                      onChange={(e) => setValue("bgColor", e.target.value)}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />

                    <div className="w-full h-full rounded-full border border-slate-200 flex items-center justify-center bg-white text-slate-400 group-hover:bg-slate-50 transition-colors">
                      <Pipette size={14} />
                    </div>
                  </div>
                </div>
                <Input
                  {...register("bgColor")}
                  className="font-mono bg-slate-50 border-none h-10 rounded-lg"
                />
                {errors.bgColor && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.bgColor.message}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Section 3: Branding */}
          <Card className="p-8 border-slate-200 shadow-sm rounded-2xl bg-white space-y-6">
            <div className="flex items-center gap-2 text-blue-600">
              <ImageIcon size={20} />
              <h2 className="font-bold uppercase tracking-widest text-xs">
                Branding
              </h2>
            </div>
            <div className="space-y-4">
              <Label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                Logo URL (Optional)
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
              {errors.logoUrl && (
                <p className="text-xs font-medium text-red-500">
                  {errors.logoUrl.message}
                </p>
              )}
            </div>
          </Card>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="h-12 px-8 font-bold text-slate-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              {isSubmitting ? "Saving..." : "Generate QR Code"}
            </Button>
          </div>
        </form>

        {/* Right Column: Sticky Preview */}
        <div className="lg:col-span-5 lg:sticky lg:top-8">
          <Card className="bg-slate-900 border-none rounded-[3rem] p-1 shadow-2xl overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[80px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[80px]" />

            <div className="bg-slate-800/40 backdrop-blur-sm rounded-[2.8rem] p-10 flex flex-col items-center relative z-10">
              {/* QR Code Graphic */}
              <div
                className="p-6 rounded-[2.5rem] shadow-2xl relative flex items-center justify-center transition-transform duration-500 hover:scale-[1.02]"
                style={{ backgroundColor: watchBg }}
              >
                <QRCode
                  id="qr-code-download"
                  value={watchUrl || "https://dynamic-link.io"}
                  size={220}
                  fgColor={watchFg}
                  bgColor={watchBg}
                  level="H"
                />

                {/* Logo Overlay logic */}
                {watchLogo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="rounded-xl shadow-lg overflow-hidden w-14 h-14 flex items-center justify-center border-4"
                      style={{
                        backgroundColor: watchBg,
                        borderColor: watchBg,
                      }}
                    >
                      <img
                        src={watchLogo}
                        alt="logo"
                        className="max-w-full max-h-full object-contain"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Labels */}
              <div className="mt-8 w-full text-center space-y-3">
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                    Live Preview
                  </p>
                  <div className="h-1 w-8 bg-blue-500/30 rounded-full" />
                </div>

                <h3 className="text-white text-2xl font-bold truncate px-4">
                  {watchTitle || "Your Title"}
                </h3>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-full border border-slate-700/50 text-slate-400 text-xs font-mono">
                  <Sparkles size={12} className="text-blue-500" />
                  {getHostname(watchUrl)}
                </div>
              </div>
            </div>
          </Card>

          {/* Education Box */}
          <div className="mt-6 p-5 bg-blue-50/50 border border-blue-100 rounded-2xl flex gap-4 items-start">
            <div className="w-8 h-8 shrink-0 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <Layout size={16} />
            </div>
            <p className="text-[12px] text-blue-900/80 leading-relaxed">
              <strong>Pro Tip:</strong> Using a high-contrast{" "}
              <strong>Pattern Color</strong> ensures your QR code is easily
              scannable in all lighting conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
