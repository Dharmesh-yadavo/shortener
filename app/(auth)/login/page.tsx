"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GoogleIcon } from "@/components/common/GoogleIcon";
import { GlassBackground } from "@/components/common/GlassBackground";
import { ChangeEvent, useState } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

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

          <form className="space-y-4 text-left">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-slate-700 font-bold ml-1 text-[11px] uppercase tracking-wider"
              >
                Email Address
              </Label>
              <Input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("email", e.target.value)
                }
                placeholder="name@example.com"
                className="h-11 text-slate-500 bg-white/60 border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-400 placeholder:text-slate-300 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <Label className="text-slate-700 font-bold text-[11px] uppercase tracking-wider">
                  Password
                </Label>
                <Link
                  href="#"
                  className="text-emerald-500 text-[10px] font-bold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("password", e.target.value)
                }
                placeholder="••••••••"
                className="h-11 bg-white/60 text-slate-500 border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-400 placeholder:text-slate-300 text-sm"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 mt-2 bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-emerald-200/50 transition-all"
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
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 bg-white/50 border-slate-100 rounded-xl text-slate-700 shadow-sm hover:border-emerald-200 hover:bg-white transition-all text-sm font-semibold"
            >
              <GoogleIcon />
              Continue with Google
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Don&lsquo;t have an account?{" "}
              <Link
                href="/signup"
                className="text-emerald-500 font-bold hover:underline"
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
