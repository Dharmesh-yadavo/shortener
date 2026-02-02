"use client";
import { Button } from "@/components/ui/button";
import Noise from "@/components/Noise";
import { GlassBackground } from "@/components/common/GlassBackground";
import ToolSwitcher from "@/components/user/ToolSwitcher";
import { Link, Box, Triangle, Pentagon, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/user/Header";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [mode, setMode] = useState("URL");

  const handleAction = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden font-serif">
      <GlassBackground opacity={1} />
      <Noise />

      <Header />

      <main className="flex flex-col items-center justify-center mt-30">
        <section className="max-w-240 w-full flex flex-col items-center gap-10">
          <div className="text-center space-y-6 max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
              Elegant links,{" "}
              <span className="italic text-[#30e8ab]/80">simplified.</span>
            </h1>
            <p className="text-md md:text-lg max-w-xl mx-auto ">
              Shorten your URLs and generate custom QR codes in seconds with our
              minimalist dashboard.
            </p>
          </div>

          {/* URL Input Glass Card */}

          <div className="w-full max-w-200 backdrop-blur-xl bg-white/40 border-white/50 p-6 md:p-8 rounded-xl shadow-2xl flex flex-col gap-6">
            {/* 1. Switcher stays on top for better UI */}
            <ToolSwitcher onValueChange={setMode} />

            {/* 2. Conditional Form UI */}
            <div className="flex flex-col md:flex-row gap-2 w-full">
              {mode === "URL" ? (
                <>
                  <div className="relative grow flex items-center">
                    <Link
                      className="absolute left-4 text-[#30e8ab]"
                      size={24}
                    />
                    <Input
                      className="w-full h-14 pl-12 pr-4 rounded-lg placeholder:text-stone-400 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-offset-0"
                      placeholder="Paste your long URL here..."
                    />
                  </div>
                  <Button
                    onClick={handleAction}
                    className="h-14 px-8 bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-bold rounded-xl shadow-md transition-all"
                  >
                    Shorten
                  </Button>
                </>
              ) : (
                <div className="w-full flex flex-col gap-4">
                  <Input
                    className="w-full h-14 pr-4 rounded-lg placeholder:text-stone-400 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 focus-visible:outline-none focus-visible:ring-offset-0"
                    placeholder="Enter text or URL for QR code..."
                  />
                  <Button
                    onClick={handleAction}
                    className="h-14 px-8 bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-bold rounded-xl shadow-md transition-all"
                  >
                    Generate QR
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 py-4">
            {/* Subtitle / Meta Text */}
            <p className=" text-sm font-semibold text-stone-500 uppercase tracking-[0.2em] px-4 text-center">
              Trusted by 10,000+ creators worldwide
            </p>

            {/* Logo Icons Grid */}
            <div className="flex items-center justify-center gap-6 md:gap-10">
              {/* Each icon now has its own hover state */}
              <Box
                size={32}
                strokeWidth={1.5}
                className="text-stone-400 hover:text-stone-500 hover:opacity-100 transition-all duration-300 cursor-pointer"
              />
              <Triangle
                size={32}
                strokeWidth={1.5}
                className="text-stone-400 hover:text-stone-500 hover:opacity-100 transition-all duration-300 cursor-pointer"
              />
              <Pentagon
                size={32}
                strokeWidth={1.5}
                className="text-stone-400 hover:text-stone-500 hover:opacity-100 transition-all duration-300 cursor-pointer"
              />
              <LayoutGrid
                size={32}
                strokeWidth={1.5}
                className="text-stone-400 hover:text-stone-500 hover:opacity-100 transition-all duration-300 cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        {/* <section className="max-w-[960px] w-full mt-40 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<BarChart />}
            title="Advanced Analytics"
            desc="Track every click and scan with real-time data insights."
          />
          <FeatureCard
            icon={<Link />}
            title="Custom Links"
            desc="Create branded short links that build trust and engagement."
          />
          <FeatureCard
            icon={<QrCode />}
            title="Dynamic QR Codes"
            desc="Generate and edit QR codes even after they've been printed."
          />
        </section> */}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
