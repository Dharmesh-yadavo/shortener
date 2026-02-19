"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GoogleIcon } from "@/components/common/GoogleIcon";
import { GlassBackground } from "@/components/common/GlassBackground";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { LoginFormAction } from "@/server/auth/auth.action";
import { LoginUserData, loginUserSchema } from "@/server/auth/auth.schema";

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit = async (data: LoginUserData) => {
    const result = await LoginFormAction(data);

    if (result.status === "success") {
      toast.success(result.message);
      redirect("/dashboard");
    } else {
      toast.error(result.message);
    }
  };

  const inputStyles = (hasError: boolean) => `
    h-11 px-4 bg-slate-50 border-slate-200 rounded-lg transition-all duration-200
    focus-visible:ring-2 focus-visible:ring-pink-500/20 focus-visible:border-pink-500 focus-visible:outline-none focus-visible:ring-offset-0
    ${hasError ? "border-red-500 bg-red-50/50 focus-visible:ring-red-500/10 focus-visible:border-red-500" : ""}
  `;

  const labelStyles =
    "text-[12px] font-semibold text-slate-600 uppercase tracking-tight";
  const errorStyles = "text-[12px] font-medium text-red-500 mt-1";

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <GlassBackground opacity={0.8} />

      <Card className="w-full max-w-105 border-white/40 bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[32px] overflow-hidden">
        <CardContent className="pt-10 pb-8 px-8 md:px-10 text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-2 text-slate-500 text-xs font-medium">
              Enter your credentials to access your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-left"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="email" className={labelStyles}>
                  Email Address
                </Label>
              </div>

              <Input
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                className={inputStyles(!!errors.email)}
              />

              {errors.email && (
                <p className={errorStyles}>{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <Label className={labelStyles}>Password</Label>
                <Link
                  href="#"
                  className="text-pink-400 text-[10px] font-bold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                required
                {...register("password")}
                placeholder="••••••••"
                className={inputStyles(!!errors.password)}
              />
              {errors.password && (
                <p className={errorStyles}>{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 mt-2 bg-pink-300 hover:bg-pink-400/80 text-slate-900 font-bold rounded-xl shadow-lg shadow-pink-200/50 transition-all"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-5 flex justify-center items-center text-xs">
            <span className="bg-transparent px-2 text-slate-500 font-medium">
              Or Continue with
            </span>
          </div>

          <div className="mt-5 space-y-3 mb-6">
            <Link href="/google">
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 bg-white/50 border-slate-100 rounded-xl text-slate-700 shadow-sm hover:border-pink-200 hover:bg-white transition-all text-sm font-semibold"
              >
                <GoogleIcon />
                Continue with Google
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Don&lsquo;t have an account?{" "}
              <Link
                href="/register"
                className="text-pink-400 font-bold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
