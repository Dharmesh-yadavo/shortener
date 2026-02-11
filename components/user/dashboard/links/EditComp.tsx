"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { shortLinkTable } from "@/drizzle/schema";
import { editLinkAction } from "@/server/users/users.action";
import { EditFormData, editLinkSchema } from "@/server/users/users.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InferSelectModel } from "drizzle-orm";
import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export type Shortlink = InferSelectModel<typeof shortLinkTable>;

interface DetailedLinksProps {
  links: Shortlink;
}

export const EditComp = ({ links }: DetailedLinksProps) => {
  // 2. Initialize Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditFormData>({
    resolver: zodResolver(editLinkSchema),
    defaultValues: {
      shortCode: `${links.shortCode}`,
      title: `${links.title}`,
    },
  });

  const shortUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${links.shortCode}`
      : `/${links.shortCode}`;

  // 3. The Submit Handler
  const onSubmit = async (data: EditFormData) => {
    // console.log(data);
    const result = await editLinkAction(data, links.shortCode);

    if (result.status === "success") {
      toast.success(result.message);
      redirect("/dashboard/links");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 lg:p-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto space-y-10"
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-stone-800">Edit link</h1>
        </div>

        <div className="space-y-8">
          {/* Static Display Section */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <Label className="text-sm font-bold text-[#071d49] w-28">
                Original link
              </Label>
              <span className="text-lg font-medium text-slate-700 truncate">
                {links.url}
              </span>
            </div>
            <div className="flex gap-4">
              <Label className="text-sm font-bold text-[#071d49] w-28">
                Short link
              </Label>
              <Link
                href="#"
                className="text-blue-600 font-bold font-sans text-lg hover:underline flex items-center gap-1.5"
              >
                {shortUrl} <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Shorten URL Input Field */}
          <div className="grid gap-2 max-w-md">
            <Label className="text-sm font-bold text-[#071d49]">
              Edit Short Code
            </Label>
            <div
              className={`flex items-center font-sans rounded-md border ${errors.shortCode ? "border-red-500" : "border-slate-200"} bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all`}
            >
              <div className="px-3 py-2  bg-slate-50 rounded-l-md text-slate-500 border-r border-slate-200 text-sm font-medium">
                {process.env.NEXT_PUBLIC_SITE_URL}
              </div>
              <input
                {...register("shortCode")}
                className="flex-1 px-3 py-2 outline-none text-[#071d49] font-medium text-sm"
                defaultValue={links.shortCode}
              />
            </div>
            {errors.shortCode && (
              <p className="text-red-500 text-xs font-medium">
                {errors.shortCode.message}
              </p>
            )}
          </div>

          <Separator className="bg-slate-100" />

          {/* Optional Details Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#071d49]">
              Optional details
            </h3>
            <div className="grid gap-2 max-w-2xl">
              <Label
                htmlFor="title"
                className="text-sm font-bold text-[#071d49]"
              >
                Title
              </Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="e.g. My Awesome Project Portfolio"
                className="h-11 border-slate-300 focus-visible:ring-blue-600 rounded-sm"
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-10 flex justify-end items-center gap-4 border-t border-slate-100">
          <Button
            type="button" // Important: type="button" so it doesn't trigger handleSubmit
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-blue-600 font-bold hover:bg-transparent hover:text-blue-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="bg-[#2b59c3] hover:bg-[#1e44a3] px-8 py-2 font-bold rounded-sm h-11"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : null}
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
