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
      icon: "FaCediSign",
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

export function processStatisticsData(orders: Order[]) {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalRevenue / totalOrders;
  const uniqueCustomers = new Set(orders.map((order) => order.userId)).size;

  const revenueByDay = calculateDataByDay(orders, "total");
  const ordersByDay = calculateDataByDay(orders, "count");
  const topSellingItems = getTopPurchased(orders);
  const orderStatusDistribution = calculateOrderStatusDistribution(orders);
  const averagePreparationTime = calculateAveragePreparationTime(orders);

  return {
    summary: [
      {
        title: "Total Revenue",
        value: totalRevenue.toFixed(2),
        icon: "FaCediSign",
      },
      { title: "Total Orders", value: totalOrders, icon: "FiShoppingCart" },
      {
        title: "Avg. Order Value",
        value: averageOrderValue.toFixed(2),
        icon: "FiTrendingUp",
      },
      { title: "Unique Customers", value: uniqueCustomers, icon: "FiUsers" },
    ],
    charts: {
      revenueByDay,
      ordersByDay,
      topSellingItems,
      orderStatusDistribution,
      averagePreparationTime,
    },
  };
}

function calculateDataByDay(
  orders: Order[],
  type: "total" | "count"
): { day: string; value: number }[] {
  const dataByDay: { [key: string]: number } = {};
  orders.forEach((order) => {
    const day = new Date(order.orderTime).toLocaleDateString("en-US", {
      weekday: "short",
    });
    if (type === "total") {
      dataByDay[day] = (dataByDay[day] || 0) + order.total;
    } else {
      dataByDay[day] = (dataByDay[day] || 0) + 1;
    }
  });
  return Object.entries(dataByDay)
    .map(([day, value]) => ({ day, value: Number(value.toFixed(2)) }))
    .sort(
      (a, b) =>
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(a.day) -
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(b.day)
    );
}

function calculateOrderStatusDistribution(
  orders: Order[]
): { name: string; value: number }[] {
  const statusCounts: { [key in OrderStatus]?: number } = {};
  orders.forEach((order) => {
    statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
  });
  return Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));
}

function calculateAveragePreparationTime(
  orders: Order[]
): { status: string; time: number }[] {
  const statusTimes: { [key in OrderStatus]?: number[] } = {};
  orders.forEach((order) => {
    if (order.status !== OrderStatus.Pending) {
      const orderTime = new Date(order.orderTime).getTime();
      const statusTime = new Date(order.deliveryTime || Date.now()).getTime();
      const timeDiff = (statusTime - orderTime) / (1000 * 60); // Convert to minutes
      if (!statusTimes[order.status]) statusTimes[order.status] = [];
      statusTimes[order.status]!.push(timeDiff);
    }
  });
  return Object.entries(statusTimes).map(([status, times]) => ({
    status,
    time: Number((times.reduce((a, b) => a + b, 0) / times.length).toFixed(2)),
  }));
}
