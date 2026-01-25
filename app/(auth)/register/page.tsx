"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GoogleIcon } from "@/components/common/GoogleIcon";
import { ChangeEvent, FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { GlassBackground } from "@/components/common/GlassBackground";

interface RegisterationFormData {
  name: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterationFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    try {
      console.log(e);
    } catch (error) {
      console.log(error);
    }
  };

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
            onSubmit={handleFormSubmit}
            className="mt-6 space-y-4 text-left"
          >
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-slate-700 font-semibold ml-1 text-xs"
              >
                Full Name
              </Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("name", e.target.value)
                }
                required
                placeholder="Full Name"
                className="h-10 bg-white/50 text-slate-500 placeholder-slate-200 border-slate-100 rounded-xl focus:ring-emerald-400 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-slate-700 font-semibold ml-1 text-xs"
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
                className="h-10 bg-white/50 text-slate-500 placeholder-slate-200 border-slate-100 rounded-xl focus:ring-emerald-400 text-sm"
              />
            </div>

            <div className="relative space-y-1">
              <Label
                htmlFor="password"
                className="text-slate-700 font-semibold ml-1 text-xs"
              >
                Password
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("password", e.target.value)
                }
                placeholder="••••••••"
                className="h-10 bg-white/50 text-slate-500 placeholder-slate-200 border-slate-100 rounded-xl focus:ring-emerald-400 text-sm"
              />
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
            <a
              href="/login"
              className="text-emerald-500 font-bold hover:underline"
            >
              Log In
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignupPage;
