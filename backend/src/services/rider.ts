import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../util/prisma";
import CustomError from "../util/error";
import * as bcrypt from "../util/bcrypt";
import * as jwt from "../util/jwt";

//create password
export const createPassword = async (email: string, password: string) => {};

//update location
export const updateLocation = async (
  riderId: string,
  location: { latitude: number; longitude: number }
) => {
  try {
    const rider = await prisma.rider.update({
      where: {
        id: riderId,
      },
      data: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
    if (!rider) {
      throw new CustomError("Rider not found", 404);
    }
    return rider;
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 400);
  }
};

//get rider
export const getRider = async (riderId: string) => {
  try {
    const rider = await prisma.rider.findUnique({
      where: {
        id: riderId,
      },
      include: {
        orders: true,
      },
    });
    if (!rider) {
      throw new CustomError("Rider not found", 404);
    }
    return rider;
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 400);
  }
};

//accept order
export const acceptOrder = async (riderId: string, orderId: string) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
        riderId: null,
        status: "looking for rider",
      },
      data: {
        riderId: riderId,
        status: "rider assigned",
      },
      include: {
        Rider: true,
        restaurant: true,
        User: true,
        CartItem: {
          include: {
            MenuItem: true,
          },
        },
      },
    });
    if (!order) {
      throw new CustomError("Order not found", 404);
    }
    return order;
  } catch (err: any) {
    //if err is an instance of prisma known error
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        throw new CustomError(
          "Order not found: Only orders with status as loking for rider can be accepted",
          404
        );
      }
      throw new CustomError(`${err.message}\nError code: ${err.code}`, 400);
    }

    throw new CustomError(err.message, err.statusCode || 400);
  }
};

//get rider orders
export const getRiderOrders = async (riderId: string) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        orderTime: "desc",
      },
      include: {
        User: true,
        restaurant: true,
        Rider: true,
        CartItem: {
          include: {
            MenuItem: true,
          },
        },
      },
    });
    return orders;
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 400);
  }
};

//end trip
export const endTrip = async (riderId: string, orderId: string) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        riderId: riderId,
        status: "on the way",
      },
    });
    if (!order) {
      throw new CustomError("Order not found", 404);
    }
    //calculate delivery fee: 10% of the order total
    const deliveryFee = order.total * 0.1;
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
        riderId: riderId,
        status: "on the way",
      },
      data: {
        status: "delivered",
        deliveryFee: deliveryFee,
        deliveryTime: new Date(Date.now()),
      },
      include: {
        User: true,
        restaurant: true,
        Rider: true,
        CartItem: {
          include: {
            MenuItem: true,
          },
        },
      },
    });

    return updatedOrder;
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 400);
  }
};
