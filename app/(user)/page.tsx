"use client";
import { Button } from "@/components/ui/button";
import ToolSwitcher from "@/components/user/ToolSwitcher";
import { Link, Box, Triangle, Pentagon, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Noise from "@/components/Noise";

const Home = () => {
  const router = useRouter();
  const [mode, setMode] = useState("URL");

  const handleAction = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans">
      <Noise />

      <main className="flex flex-col items-center justify-center mt-30">
        <section className="max-w-240 w-full flex flex-col items-center gap-10">
          <div className="text-center space-y-6 max-w-xl">
            <h1 className="text-4xl md:text-6xl font-roboto font-bold leading-[1.1] tracking-tight">
              Elegant links,{" "}
              <span className="italic text-stone-800">simplified.</span>
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
            <div className="flex flex-col md:flex-row gap-2 mt-2 w-full">
              {mode === "URL" ? (
                <>
                  <div className="relative grow flex items-center">
                    <Link
                      className="absolute left-4 text-stone-900"
                      size={24}
                    />
                    <Input
                      className="w-full h-12 pl-12 pr-4 rounded-lg placeholder:text-stone-400 focus-visible:ring-2 focus-visible:ring-pink-500/20 focus-visible:border-pink-500 focus-visible:outline-none focus-visible:ring-offset-0"
                      placeholder="Paste your long URL here..."
                    />
                  </div>
                  <Button
                    onClick={handleAction}
                    className="h-12 px-8 bg-pink-300 hover:bg-pink-400 text-slate-900 font-bold rounded-xl shadow-md transition-all"
                  >
                    Shorten
                  </Button>
                </>
              ) : (
                <div className="w-full flex flex-col gap-4">
                  <Input
                    className="w-full h-14 pr-4 rounded-lg placeholder:text-stone-400 focus-visible:ring-2 focus-visible:ring-pink-500/20 focus-visible:border-pink-500 focus-visible:outline-none focus-visible:ring-offset-0"
                    placeholder="Enter text or URL for QR code..."
                  />
                  <Button
                    onClick={handleAction}
                    className="h-12 px-8 bg-pink-300 hover:bg-pink-400 text-slate-900 font-bold rounded-xl shadow-md transition-all"
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
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Home;
