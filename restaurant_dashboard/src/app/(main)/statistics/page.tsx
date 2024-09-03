import StatisticsCharts from "../../../components/pages/statistics/StatisticsCharts";

export default function SettingsPage() {
  const overviewData = [
    { title: "Total Revenue", value: "$25,678" },
    { title: "Orders Delivered", value: "1,543" },
    { title: "Average Delivery Time", value: "28 mins" },
    { title: "Active Deliverers", value: "42" },
  ];

  const chartData = {
    revenue: [1200, 1900, 3000, 5000, 4000, 3000, 2000],
    orders: [150, 230, 380, 600, 500, 400, 300],
    customerSatisfaction: [4.2, 4.3, 4.5, 4.7, 4.6, 4.4, 4.5],
    topSellingItems: [
      { name: "Pizza", value: 120 },
      { name: "Burger", value: 80 },
      { name: "Pasta", value: 60 },
      { name: "Salad", value: 40 },
      { name: "Dessert", value: 30 },
    ],
    deliveryStatus: [
      { name: "On Time", value: 70 },
      { name: "Delayed", value: 20 },
      { name: "Cancelled", value: 10 },
    ],
  };

  return (
    <div className="p-8">
      <StatisticsCharts data={chartData} />
    </div>
  );
}
