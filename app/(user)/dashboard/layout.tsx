// DashBoardLayout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/DashBoardSlideBar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 h-screen overflow-y-auto bg-[#F8FAFC] font-serif ">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
