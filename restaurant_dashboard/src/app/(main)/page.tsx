import Dashboard from "@/components/pages/home/Dashboard";
import { getDashboardStats } from "@/services/statsService";
import ErrorToast from "@/components/ui/ErrorToast";

export const revalidate = 0;

export default async function Home() {
  let dashboardData: any = {};
  let error: string | null = null;

  try {
    dashboardData = await getDashboardStats();
  } catch (e) {
    error = e instanceof Error ? e.message : "An unknown error occurred";
  }

  return (
    <main className="min-h-screen mt-6">
      {error && <ErrorToast error={error} />}
      <Dashboard data={dashboardData} />
    </main>
  );
}
