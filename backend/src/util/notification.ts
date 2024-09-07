import pusher from "../util/pusher";
import CustomError from "./error";

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
