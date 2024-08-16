import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col md:flex-row relative min-h-screen">
      <div className="md:hidden w-full">
        <Sidebar />
      </div>
      <div className="hidden md:block sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 bg-white p-4">{children}</div>
    </main>
  );
}
