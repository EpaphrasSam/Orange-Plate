import StatisticsCharts from "../../../components/pages/statistics/StatisticsCharts";
import { getStatisticsData } from "@/services/statsService";
import ErrorToast from "@/components/ui/ErrorToast";

export const revalidate = 0;

export default async function Statistics() {
  let statisticsData: any = {};
  let error: string | null = null;

  try {
    statisticsData = await getStatisticsData();
  } catch (e) {
    error = e instanceof Error ? e.message : "An unknown error occurred";
  }

  return (
    <div className="p-8">
      {error && <ErrorToast error={error} />}
      <StatisticsCharts data={statisticsData} />
    </div>
  );
}
