import Dashboard from "@/components/pages/home/Dashboard";
import { getDashboardStats } from "@/services/statsService";

export default async function Home() {
  const dashboardData = await getDashboardStats();

  return (
    <main className="min-h-screen mt-6">
      <Dashboard data={dashboardData} />
    </main>
  );
}
