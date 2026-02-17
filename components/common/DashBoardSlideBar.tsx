"use client";

import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  BarChart3,
  Settings,
  QrCode,
  LogOut,
  LinkIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { logoutUserAction } from "@/server/auth/auth.action";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const navItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Links", url: "/dashboard/links", icon: LinkIcon },
  { title: "QR Codes", url: "/dashboard/qr-code", icon: QrCode },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export const AppSidebar = () => {
  const pathname = usePathname();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await logoutUserAction();
      if (result.success) {
        toast.success("Successfully logged out");
        router.push("/login");
        router.refresh();
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message !== "NEXT_REDIRECT") {
        console.error(error);
        toast.error("Error while logging out");
      }
    }
  };

  return (
    <Sidebar className="text-stone-600 border-r border-zinc-200 font-sans">
      <SidebarHeader className="p-4 items-center">
        <div className="flex items-center gap-3 px-2 py-4">
          <span className="text-lg font-bold text-black font-serif ">
            Shorten.io
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-2">
              {navItems.map((item) => {
                // Check if this link is currently active
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "relative h-12 px-4 rounded-lg font-semibold transition-all duration-200",
                        "text-stone-600 hover:bg-stone-100",
                        isActive &&
                          "bg-[#EDF3FF] text-blue-700 hover:bg-[#EDF3FF]",
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-blue-700" />
                        )}

                        <item.icon
                          className={cn(
                            "size-5",
                            isActive ? "text-blue-700" : "text-stone-500",
                          )}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          size="lg" // Larger hit area feels more premium
          onClick={handleLogout}
          className="group w-full justify-start gap-3 px-3 py-6 text-sm font-medium text-muted-foreground hover:text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-200"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg ">
            <LogOut size={18} />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-foreground font-semibold">Log out</span>
            <span className="text-[10px] text-muted-foreground">
              End your current session
            </span>
          </div>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
