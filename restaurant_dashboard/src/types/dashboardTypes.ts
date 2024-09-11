import { OrderStatus } from "./orderType";

export interface DashboardSummary {
  title: string;
  value: string | number;
  icon: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  items: Array<{ name: string; quantity: number }>;
  total: number;
  status: OrderStatus;
}

export interface TopPurchasedItem {
  name: string;
  value: number;
}

export interface SalesDataPoint {
  time: string;
  sales: number;
}

export interface DashboardData {
  summary: DashboardSummary[];
  recentOrders: RecentOrder[];
  topPurchased: TopPurchasedItem[];
  salesData: SalesDataPoint[];
}
