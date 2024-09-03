import { IconType } from "react-icons";
import {
  MdDashboard,
  MdShoppingCart,
  MdRestaurantMenu,
  MdLocalShipping,
  MdInsertChart,
  MdNotifications,
  MdSettings,
  MdHistory,
} from "react-icons/md";

export interface Route {
  name: string;
  path: string;
  icon: IconType;
}

export const routes: Route[] = [
  { name: "Dashboard", path: "/", icon: MdDashboard },
  { name: "Orders", path: "/orders", icon: MdShoppingCart },
  { name: "Menu", path: "/menu", icon: MdRestaurantMenu },
  { name: "Delivery", path: "/delivery", icon: MdLocalShipping },
  { name: "Statistics", path: "/statistics", icon: MdInsertChart },
  // {
  //   name: "History",
  //   path: "/history",
  //   icon: MdHistory,
  // },
  // {
  //   name: "Notification",
  //   path: "/notifications",
  //   icon: MdNotifications,
  // },
  { name: "Settings", path: "/settings", icon: MdSettings },
];
