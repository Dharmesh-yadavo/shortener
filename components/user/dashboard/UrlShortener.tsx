"use client";
import { Link as LinkIcon, Zap, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const UrlShortener = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    // resolver: zodResolver(registerUserSchema),
  });

  const onSubmit = async (data: unknown) => {
    console.log(data);
    // const result = await registrationAction(data);

    // if (result.status === "success") {
    // } else {
    //   toast.error(result.message);
    // }
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
                <LinkIcon className="text-slate-400" size={20} />
              </div>
              <Input
                type="url"
                required
                {...register("url")}
                className="w-full h-12 pl-11 rounded-md border-slate-200 "
                placeholder="https://example.com/my-long-url"
              />
            </div>
            <Button className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-sm transition-all active:scale-95">
              Shorten Link
            </Button>
          </div>
        </div>
      </form>

      {/* Footer for Links */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
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
