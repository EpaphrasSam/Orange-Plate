import Dashboard from "@/components/pages/home/Dashboard";

// Static data to mimic dashboard content
const dashboardData = {
  summary: [
    {
      title: "Total Revenue (₵)",
      value: "3,262",
      icon: "FaMoneyBillWave",
    },
    { title: "Total Orders", value: "1,789", icon: "FaShoppingCart" },
    { title: "Daily Sales", value: "5,678", icon: "FaChartLine" },
    { title: "Total Income (₵)", value: "7,834", icon: "FaWallet" },
  ],
  recentOrders: [
    {
      id: "1",
      customer: "John Doe",
      items: "2x Burger, 1x Fries",
      total: "₵ 56.78",
      status: "Completed",
    },
    {
      id: "2",
      customer: "Jane Smith",
      items: "1x Pizza, 2x Coke",
      total: "₵ 89.99",
      status: "Processing",
    },
    {
      id: "3",
      customer: "Bob Johnson",
      items: "3x Tacos, 1x Salad",
      total: "₵ 34.50",
      status: "Pending",
    },
    {
      id: "4",
      customer: "Alice Brown",
      items: "1x Steak, 1x Wine",
      total: "₵ 78.20",
      status: "Completed",
    },
  ],
  topPurchased: [
    { name: "Burger", quantity: 145, image: "/burger.jpg" },
    { name: "Pizza", quantity: 132, image: "/burger.jpg" },
    { name: "Fries", quantity: 113, image: "/burger.jpg" },
    { name: "Salad", quantity: 92, image: "/burger.jpg" },
  ],
  salesData: [
    { time: "00:00", sales: 400 },
    { time: "04:00", sales: 300 },
    { time: "08:00", sales: 500 },
    { time: "12:00", sales: 450 },
    { time: "16:00", sales: 600 },
    { time: "20:00", sales: 550 },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen mt-6">
      <Dashboard data={dashboardData} />
    </main>
  );
}
