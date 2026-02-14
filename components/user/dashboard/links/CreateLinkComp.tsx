"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { CreateLinkData, createLinkSchema } from "@/server/users/users.schema";
import { createLinkAction } from "@/server/users/users.action";
import { Info, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const CreateLinkComp = ({
  userId,
  plan,
  linksCreated,
}: {
  userId: number;
  plan: "free" | "pro" | "business" | null;
  linksCreated: number;
}) => {
  const router = useRouter();

  // Initialize form without the Shadcn Form wrapper
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkData>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      url: "",
      title: "",
      shortCode: "",
    },
  });

  const onSubmit = async (data: CreateLinkData) => {
    const result = await createLinkAction(data, userId);

    if (result.status === "success") {
      toast.success(result.message);
      redirect("/dashboard/links");
    } else {
      toast.error(result.message);
    }
  };

  // --- LIMIT LOGIC ---
  const limits = {
    free: 5,
    pro: 30,
    business: Infinity,
  };

  const currentPlan = (plan?.toLowerCase() || "free") as keyof typeof limits;
  const maxLinks = limits[currentPlan];
  const remainingLinks =
    maxLinks === Infinity ? Infinity : Math.max(0, maxLinks - linksCreated);
  const isLimitReached = maxLinks !== Infinity && remainingLinks === 0;

  return (
    <div className="max-w-3xl mx-auto font-sans py-12 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Create a new link
        </h1>

        {/* Plan Badge */}
        <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
          {plan} Plan
        </div>
      </div>

      {/* --- LIMIT NOTIFICATION BAR --- */}
      <div
        className={cn(
          "p-4 rounded-xl border flex items-center justify-between shadow-sm",
          isLimitReached
            ? "bg-red-50 border-red-100"
            : "bg-white border-slate-200",
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-2 rounded-lg",
              isLimitReached
                ? "bg-red-100 text-red-600"
                : "bg-blue-50 text-blue-600",
            )}
          >
            <Info size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              {maxLinks === Infinity
                ? "Unlimited links enabled"
                : `${remainingLinks} links remaining`}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {maxLinks === Infinity
                ? "Your Business plan allows for infinite short links."
                : `You've used ${linksCreated} out of your ${maxLinks} link limit.`}
            </p>
          </div>
        </div>

        {isLimitReached && (
          <Link href="/subscription">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold gap-2"
            >
              <Zap size={14} fill="currentColor" /> Upgrade Now
            </Button>
          </Link>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b py-3 px-6">
            <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Link details
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            {/* Destination URL */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-900">
                Destination URL
              </label>
              <Input
                placeholder="https://example.com/my-long-url"
                className={`h-12 font-sans border-slate-300 focus:ring-blue-500 text-base ${
                  errors.url ? "border-red-500" : ""
                }`}
                {...register("url")}
              />
              {errors.url && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.url.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-2">
              {/* Domain Display */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-bold text-slate-900">
                  Domain
                </label>
                <Select disabled defaultValue="localhost:3000">
                  <SelectTrigger className="h-12 bg-slate-50 border-slate-300 font-sans">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="localhost:3000">
                      localhost:3000
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Back-half */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-bold text-slate-900">
                  Custom back-half{" "}
                  <span className="text-slate-400 font-medium">(optional)</span>
                </label>
                <div className="flex group">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm font-medium">
                    /
                  </span>
                  <Input
                    placeholder="favorite-link"
                    className={`h-12 font-sans border-slate-300 rounded-l-none focus:ring-blue-500 text-base ${
                      errors.shortCode ? "border-red-500" : ""
                    }`}
                    {...register("shortCode")}
                  />
                </div>
                {errors.shortCode && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.shortCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-900">
                Title{" "}
                <span className="text-slate-400 font-medium">(optional)</span>
              </label>
              <Input
                placeholder="e.g. My Portfolio Link"
                className={`h-12 font-sans border-slate-300 focus:ring-blue-500 text-base ${
                  errors.title ? "border-red-500" : ""
                }`}
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.title.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            className="font-bold text-slate-600 h-12 px-6 hover:bg-slate-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-10 rounded-lg shadow-lg transition-transform active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create your link"}
          </Button>
        </div>
      </form>
    </div>
  );
};
