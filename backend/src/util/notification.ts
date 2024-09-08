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
