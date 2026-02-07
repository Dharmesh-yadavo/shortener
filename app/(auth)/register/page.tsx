"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GoogleIcon } from "@/components/common/GoogleIcon";
import { Eye, EyeOff } from "lucide-react";
import { GlassBackground } from "@/components/common/GlassBackground";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { redirect } from "next/navigation";
import {
  RegisterUserData,
  registerUserSchema,
} from "@/server/auth/auth.schema";
import { registrationAction } from "@/server/auth/auth.action";
import Link from "next/link";

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit = async (data: RegisterUserData) => {
    const result = await registrationAction(data);

    if (result.status === "success") {
      toast.success(result.message);
      redirect("/dashboard");
    } else {
      toast.error(result.message);
    }
  };

  const inputStyles = (hasError: boolean) => `
    h-11 px-4 bg-slate-50 border-slate-200 rounded-lg transition-all duration-200
    focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-offset-0
    ${hasError ? "border-red-500 bg-red-50/50 focus-visible:ring-red-500/10 focus-visible:border-red-500" : ""}
  `;

  const labelStyles =
    "text-[12px] font-semibold text-slate-600 uppercase tracking-tight";
  const errorStyles = "text-[12px] font-medium text-red-500 mt-1";

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <GlassBackground opacity={0.4} />

      <Card className="w-full max-w-110 border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl rounded-[32px] overflow-hidden">
        <CardContent className="pt-8 pb-8 px-8 md:px-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">
            Create your <br />
            <span className="text-emerald-400 italic font-medium">account</span>
          </h1>
          <p className="mt-2 text-slate-600 text-xs">
            Join 10,000+ creators and start shortening.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-4 text-left"
          >
            <div className="space-y-1">
              <Label htmlFor="name" className={labelStyles}>
                Full Name
              </Label>
              <Input
                type="text"
                required
                {...register("name")}
                placeholder="Full Name"
                className={inputStyles(!!errors.name)}
              />
              {errors.name && (
                <p className={errorStyles}>{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className={labelStyles}>
                Email Address
              </Label>
              <Input
                type="email"
                required
                {...register("email")}
                placeholder="name@example.com"
                className={inputStyles(!!errors.email)}
              />
              {errors.email && (
                <p className={errorStyles}>{errors.email.message}</p>
              )}
            </div>

            <div className="relative space-y-1">
              <Label htmlFor="password" className={labelStyles}>
                Password
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                required
                {...register("password")}
                placeholder="••••••••"
                className={inputStyles(!!errors.password)}
              />
              {errors.password && (
                <p className={errorStyles}>{errors.password.message}</p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-7 text-stone-500 hover:text-emerald-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-11 mt-2  bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-bold rounded-xl shadow-md shadow-emerald-200 transition-all"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 flex justify-center items-center text-xs">
            <span className="bg-transparent px-2 text-slate-500 font-medium">
              Or sign up with
            </span>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 bg-white/50 border-slate-100 rounded-xl text-white shadow-md hover:border-emerald-200 hover:bg-emerald-400/10 focus:ring-emerald-400/10 text-sm"
            >
              <GoogleIcon />
              <span className="font-semibold text-slate-700 ">Google</span>
            </Button>
          </div>

          <p className="mt-6 flex justify-center items-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-500 font-bold hover:underline"
            >
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignupPage;
