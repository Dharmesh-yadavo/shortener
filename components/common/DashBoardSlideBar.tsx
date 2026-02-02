"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Link as LinkIcon,
  BarChart3,
  Settings,
  QrCode,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Links", url: "/dashboard/links", icon: LinkIcon },
  { title: "QR Codes", url: "/dashboard/qr-code", icon: QrCode },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar className="text-stone-600 border-r border-zinc-200">
      <SidebarHeader className="p-2">
        <div className="flex items-center gap-3 px-2 py-4">
          <span className="text-lg font-bold text-emerald-500">
            Shortener.io
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
                        // Active state matching your blue photo
                        isActive &&
                          "bg-[#EDF3FF] text-blue-700 hover:bg-[#EDF3FF]",
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        {/* The Blue Indicator Bar on the far left */}
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
    </Sidebar>
  );
};
