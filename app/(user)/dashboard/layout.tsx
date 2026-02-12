// DashBoardLayout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/DashBoardSlideBar";
import { ToastHandler } from "@/components/user/subscription/ToastHandeler";
import { Suspense } from "react";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-[#F8FAFC] font-serif ">
        <Suspense fallback={null}>
          <ToastHandler />
        </Suspense>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
