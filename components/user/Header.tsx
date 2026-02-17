"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";

export const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const navigationItems = [
    { id: "/product", label: "Product" },
    { id: "/feature", label: "Feature" },
    { id: "/subscription", label: "Pricing" },
  ];

  const navigationButtons = [
    { id: "/login", label: "Login" },
    { id: "/register", label: "Sign-up" },
  ];

  return (
    <header className="fixed top-0 w-full z-10 mt-4 md:mt-6 px-4">
      <nav className="max-w-3xl mx-auto flex items-center justify-between p-2 border border-white/20 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 shadow-lg shadow-black/5">
        {/* Logo */}
        <div className="shrink-0 pl-4">
          <Link
            href="/"
            className="text-xl font-bold text-zinc-900 dark:text-white tracking-tighter hover:opacity-80 transition-opacity"
          >
            Shorten.io
          </Link>
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-8 items-center">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.id}
              className={cn(
                "text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95",
                pathname === item.id
                  ? "text-pink-500"
                  : "text-zinc-400 hover:text-pink-400",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-1">
          {navigationButtons.map((item) => (
            <Link
              key={item.id}
              href={item.id}
              className="group flex items-center gap-2 py-2 px-4 text-sm font-bold transition-all"
            >
              <span className="shrink-0 transition-transform group-hover:-translate-y-0.5">
                {item.label}
              </span>
              <ArrowUpRight className="w-6 h-6 bg-pink-300  p-1.5 rounded-full text-zinc-900 transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:rotate-45" />
            </Link>
          ))}
        </div>

        {/* Mobile Trigger */}
        <div className="md:hidden pr-1">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-pink-400/10 hover:text-pink-500"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85%] sm:w-[400px] p-0 border-l border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl"
            >
              <div className="flex flex-col h-full p-6">
                <SheetHeader className="flex flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
                  <SheetTitle className="text-2xl font-black tracking-tighter text-pink-500">
                    Shorten.io
                  </SheetTitle>
                  <SheetClose className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"></SheetClose>
                </SheetHeader>

                <div className="flex flex-col justify-between h-full py-8">
                  {/* Links Section */}
                  <div className="space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.id}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all active:scale-95",
                          pathname === item.id
                            ? "bg-pink-400/10 text-pink-500 border border-pink-400/20"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900",
                        )}
                      >
                        {item.label}
                        {pathname === item.id && (
                          <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        )}
                      </Link>
                    ))}
                  </div>

                  {/* Bottom Action Section */}
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 px-2">
                      Account
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {navigationButtons.map((item) => (
                        <Link
                          key={item.id}
                          href={item.id}
                          onClick={() => setOpen(false)}
                          className="flex flex-col gap-4 p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-transparent hover:border-pink-400/50 transition-all active:scale-95 group"
                        >
                          <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center text-zinc-900 shadow-lg shadow-pink-400/20 group-hover:rotate-45 transition-transform">
                            <ArrowUpRight className="w-6 h-6" />
                          </div>
                          <span className="font-bold text-zinc-900 dark:text-white">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};
