import {
  Decimal,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import prisma from "../util/prisma"; //
import { Prisma } from "@prisma/client"; //import prisma.ts file
import CustomError from "../util/error";
import * as bcrypt from "../util/bcrypt";
import * as jwt from "../util/jwt";
import { point, distance } from "@turf/turf";
import * as notification from "../util/notification";

//update restaurant
export const updateRestaurant = async (
  restaurantData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    latitude: number;
    longitude: number;
    openingHours: string;
    closingHours: string;
  },
  restaurantId: string
) => {
  try {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: restaurantId },
      data: restaurantData,
    });
    return updatedRestaurant;
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      throw new CustomError(`Prisma error '${err.code}' occured`, 500);
    }
    throw new CustomError(err.message, 500);
  }
};

//get restaurant by id
export const getRestaurantById = async (restaurantId: string) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        menuItems: true,
      },
    });
    return restaurant;
  } catch (err: any) {
    throw new CustomError(err.message, 500);
  }
};

//create password
export const createPassword = async (email: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hashPassword(password);
    const updatedRestaurant = await prisma.restaurant.update({
      where: { email: email },
      data: { password: hashedPassword },
    });
    const token = await jwt.generateToken({
      id: updatedRestaurant.id,
      name: updatedRestaurant.name,
    });
    return { token, updatedRestaurant };
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      //if email is not found
      if (err.code === "P2025") {
        throw new CustomError("Restaurant nof found: check email", 404);
      }
      throw new CustomError(`Prisma error '${err.code}' occured`, 501);
    }
    throw new CustomError(err.message, 500);
  }
};

//create menu
export const createMenu = async (
  menuItemData: {
    name: string;
    description: string;
    price: number;
    option: string;
    restaurantId: string;
    categoryId: string;
  }[]
) => {
  try {
    const menu = await prisma.menuItem.createMany({
      data: menuItemData,
    });
    return menu;
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2003") {
        throw new CustomError("Restaurant not found", 404);
      }
      throw new CustomError(`Database error: ${err.code}`, 500);
    }
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

//update menu item
export const updateMenuItem = async (
  menuItemData: { name: string; description: string; price: number },
  menuItemId: string,
  restaurantId: string
) => {
  try {
    //check if the menu item is not in any cart
    const menu = await prisma.menuItem.update({
      where: {
        id: menuItemId,
        restaurantId: restaurantId,
        CartItem: { none: {} },
      },
      data: menuItemData,
    });
    return menu;
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      throw new CustomError(`Prisma error '${err.code}' occured`, 500);
    }
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

//delete menu item
export const deleteMenuItem = async (
  menuItemId: string,
  restaurantId: string
) => {
  try {
    const deletedMenuItem = await prisma.menuItem.delete({
      where: {
        id: menuItemId,
        restaurantId: restaurantId,
        CartItem: { none: {} },
      },
    });
    return deletedMenuItem;
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      throw new CustomError(`Prisma error '${err.code}' occured`, 500);
    }
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

//get all categories
export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        MenuItem: true,
      },
    });
    return categories;
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 500);
  }
};
//get orders
export const getOrders = async (restaurantId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: { restaurantId: restaurantId },
      include: {
        User: true,
        CartItem: {
          include: {
            MenuItem: true,
          },
        },
      },
    });
    return orders;
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      throw new CustomError(`Prisma error '${err.code}' occured`, 500);
    }
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

//get order
export const getOrder = async (orderId: string, restaurantId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId, restaurantId: restaurantId },
      include: {
        User: true,
        CartItem: {
          include: {
            MenuItem: true,
          },
        },
      },
    });
    return order;
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      throw new CustomError(`Prisma error '${err.code}' occured`, 500);
    }
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

//update order status
export const updateOrderStatus = async (
  orderId: string,
  restaurantId: string
) => {
  try {
    //get the order
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        restaurantId: restaurantId,
      },
    });
    if (!order) {
      throw new CustomError("Order not found", 404);
    }
    //if order status == pending
    if (order.status.toLowerCase() === "pending") {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId, restaurantId: restaurantId },
        data: { status: "processing" },
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
    }
    //if order status == processing
    if (order.status.toLowerCase() === "processing") {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId, restaurantId: restaurantId },
        data: { status: "ready" },
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
    }
    //if order status == ready
    if (order.status.toLowerCase() === "ready") {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId, restaurantId: restaurantId },
        data: { status: "looking for rider" },
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
      //find the restaurant
      const restaurant = await prisma.restaurant.findUnique({
        where: { id: order.restaurantId },
      });
      //send notification to riders
      const restaurantLocation: {
        latitude: number;
        longitude: number;
      } = {
        latitude: restaurant?.latitude
          ? new Prisma.Decimal(restaurant.latitude).toNumber()
          : 0,
        longitude: restaurant?.longitude
          ? new Prisma.Decimal(restaurant.longitude).toNumber()
          : 0,
      };
      await notification.sendRiderPickUpNotification(
        restaurantLocation,
        updatedOrder
      );
      return updatedOrder;
    }
    //if order status == rider assigned
    if (order.status.toLowerCase() === "rider assigned") {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId, restaurantId: restaurantId },
        data: { status: "on the way" },
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
    }
    //if order status == "looking for rider"
    if (order.status.toLowerCase() === "looking for rider") {
      throw new CustomError("Waiting for rider to accept order", 400);
    }
    //if order status == delivered
    if (order.status.toLowerCase() === "delivered") {
      throw new CustomError("Order already delivered", 400);
    }
    throw new CustomError("Order Status Update Failed", 500);
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      throw new CustomError(`Prisma error '${err.code}' occured`, 500);
    }
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

//get riders near restaurant
export const ridersCloseBy = async (restaurantLocation: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const riders = await prisma.rider.findMany({
      where: {
        latitude: {
          gte: restaurantLocation.latitude - 0.05,
          lte: restaurantLocation.latitude + 0.05,
        },
        longitude: {
          gte: restaurantLocation.longitude - 0.05,
          lte: restaurantLocation.longitude + 0.05,
        },
      },
    });

    const restaurantPoint = point([
      restaurantLocation.longitude,
      restaurantLocation.latitude,
    ]);
    // Filter riders within a 5km radius
    const filteredRiders = riders.filter((rider) => {
      const riderPoint = point([
        Number(rider.longitude),
        Number(rider.latitude),
      ]);
      const distanceInKm = distance(restaurantPoint, riderPoint, {
        units: "kilometers",
      });
      return distanceInKm <= 5;
    });
    return filteredRiders;
  } catch (err: any) {
    console.log(err);
    throw new CustomError(err.message, err.statusCode || 500);
  }
};
