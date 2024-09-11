"use server";

import {
  processOrderData,
  processStatisticsData,
} from "@/helpers/statsConverter";
import { auth } from "@/utils/auth";
import axios from "@/utils/axios";

export const getDashboardStats = async () => {
  try {
    const session = await auth();
    const res = await axios.get(`/restaurant/orders/${session?.user?.id}`, {
      headers: {
        Authorization: `${session?.user?.token}`,
      },
    });
    const processedData = processOrderData(res.data.orders);
    return processedData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch stats");
  }
};

export const getStatisticsData = async () => {
  try {
    const session = await auth();
    const res = await axios.get(`/restaurant/orders/${session?.user?.id}`, {
      headers: {
        Authorization: `${session?.user?.token}`,
      },
    });
    const processedData = processStatisticsData(res.data.orders);
    return processedData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch statistics data");
  }
};
