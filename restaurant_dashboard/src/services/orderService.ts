"use server";

import { auth } from "@/utils/auth";
import axios from "@/utils/axios";
import { Order } from "@/types/orderType";
import { revalidatePath } from "next/cache";

export const getOrders = async (): Promise<Order[]> => {
  try {
    const session = await auth();
    const res = await axios.get(`/restaurant/orders/${session?.user?.id}`, {
      headers: {
        Authorization: `${session?.user?.token}`,
      },
    });
    const sortedOrders = res.data.orders.sort(
      (a: Order, b: Order) =>
        new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime()
    );

    return sortedOrders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders. Please try again later.");
  }
};

export const updateOrderStatus = async (orderId: string) => {
  try {
    const session = await auth();
    console.log(orderId, session?.user?.token);
    const res = await axios.put(
      `/restaurant/update-order-status/${orderId}`,
      {},
      {
        headers: {
          Authorization: `${session?.user?.token}`,
        },
      }
    );
    revalidatePath("/orders");
    return true;
  } catch (error: any) {
    console.error(error.response.data);
    throw new Error("Failed to update order status. Please try again later.");
  }
};
