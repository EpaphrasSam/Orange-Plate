import { Order, OrderStatus } from "@/types/orderType";
import {
  DashboardData,
  RecentOrder,
  TopPurchasedItem,
  SalesDataPoint,
} from "@/types/dashboardTypes";

export function processOrderData(orders: Order[]): DashboardData {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const uniqueCustomers = new Set(orders.map((order) => order.userId)).size;
  const avgOrderValue = totalRevenue / totalOrders;

  const summary = [
    { title: "Total Orders", value: totalOrders, icon: "FiShoppingCart" },
    {
      title: "Total Revenue",
      value: totalRevenue.toFixed(2),
      icon: "FiDollarSign",
    },
    { title: "Total Customers", value: uniqueCustomers, icon: "FiUsers" },
    {
      title: "Avg. Order Value",
      value: avgOrderValue.toFixed(2),
      icon: "FiTrendingUp",
    },
  ];

  const recentOrders = getRecentOrders(orders);
  const topPurchased = getTopPurchased(orders);
  const salesData = getSalesData(orders);

  return { summary, recentOrders, topPurchased, salesData };
}

function getRecentOrders(orders: Order[]): RecentOrder[] {
  return orders
    .filter((order) => order.CartItem.length > 0)
    .slice(-5)
    .reverse()
    .map((order) => ({
      id: order.id,
      customer: order.User.name,
      items: order.CartItem.map((item) => ({
        name: item.MenuItem.name,
        quantity: item.quantity,
      })),
      total: Number(order.total.toFixed(2)),
      status: order.status as OrderStatus,
    }));
}

function getTopPurchased(orders: Order[]): TopPurchasedItem[] {
  const itemCounts: { [key: string]: number } = {};
  orders.forEach((order) => {
    order.CartItem.forEach((item) => {
      const itemName = item.MenuItem.name;
      itemCounts[itemName] = (itemCounts[itemName] || 0) + item.quantity;
    });
  });
  return Object.entries(itemCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }));
}

function getSalesData(orders: Order[]): SalesDataPoint[] {
  const salesByHour: { [key: string]: number } = {};
  orders.forEach((order) => {
    const hour = new Date(order.orderTime).getHours();
    const timeKey = `${hour.toString().padStart(2, "0")}:00`;
    salesByHour[timeKey] = (salesByHour[timeKey] || 0) + order.total;
  });
  return Object.entries(salesByHour)
    .map(([time, sales]) => ({ time, sales: Number(sales.toFixed(2)) }))
    .sort((a, b) => a.time.localeCompare(b.time));
}
