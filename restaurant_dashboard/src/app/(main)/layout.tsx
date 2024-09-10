import Sidebar from "@/components/layout/Sidebar";
import { SessionProvider } from "next-auth/react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <main className="flex flex-col md:flex-row relative min-h-screen">
        <div className="md:hidden w-full">
          <Sidebar />
        </div>
        <div className="hidden md:block sticky top-0 h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 flex-grow overflow-auto px-2 md:p-4">
          {children}
        </div>
      </main>
    </SessionProvider>
  );
}
