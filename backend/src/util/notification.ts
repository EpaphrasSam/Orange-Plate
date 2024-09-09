import pusher from "../util/pusher";
import CustomError from "./error";
import * as restaurantService from "../services/resturant";
import prisma from "../util/prisma";

export const sendOrderStatusNotification = async (
  userId: string,
  orderId: string,
  status: string
) => {
  try {
    const notis = await pusher.trigger(`order-${userId}`, "order-status", {
      orderId: orderId,
      userId: userId,
      status: status,
    });
    return notis;
  } catch (err: any) {
    throw new CustomError("Failed to send notification", 500);
  }
};

export const sendRiderPickUpNotification = async (
  restaurantLocation: {
    latitude: number;
    longitude: number;
  },
  orderData: {}
) => {
  try {
    const riders = await restaurantService.ridersCloseBy(restaurantLocation);
    const riderIds = riders.map((rider) => rider.id);
    //send notification to each rider
    for (const riderId of riderIds) {
      await pusher.trigger(`rider-${riderId}`, "rider-pick-up", {
        riderId: riderId,
        restaurantLocation: restaurantLocation,
        orderData,
      });
    }
  } catch (err: any) {
    throw new CustomError("Failed to send notification", 500);
  }
};

//prompt user to make payment
export const sendPaymentPromptNotification = async (order: {
  id: string;
  status: string;
  total: number;
  orderTime: Date;
  deliveryTime: Date | null;
  deliveryFee: number | null;
  userId: string;
  userName: string | undefined;
  riderName: string | undefined;
  vehicleNumber: string | undefined;
  menuItems: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
}) => {
  try {
    await pusher.trigger(`user-${order.userId}`, "payment-prompt", {
      order,
    });
  } catch (err: any) {
    throw new CustomError("Failed to send notification", 500);
  }
};
