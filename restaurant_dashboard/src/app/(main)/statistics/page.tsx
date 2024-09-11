import StatisticsCharts from "../../../components/pages/statistics/StatisticsCharts";
import { getStatisticsData } from "@/services/statsService";

export default async function StatisticsPage() {
  const statisticsData = await getStatisticsData();

  return (
    <div className="p-8">
      <StatisticsCharts data={statisticsData} />
    </div>
  );
}
