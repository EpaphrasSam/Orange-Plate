"use server";

import { auth } from "@/utils/auth";
import axios from "@/utils/axios";

export const getOrders = async () => {
  try {
    const session = await auth();
    console.log(session?.user?.id);
    const res = await axios.get(`/restaurant/orders/${session?.user?.id}`, {
      headers: {
        Authorization: `${session?.user?.token}`,
      },
    });
    return res.data.orders;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
