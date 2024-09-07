import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../util/prisma"; //import prisma.ts file
import CustomError from "../util/error";
import * as bcrypt from "../util/bcrypt";
import * as jwt from "../util/jwt";

//update restaurant
export const updateRestaurant = async (
  restaurantData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    latitude: number;
    longitude: number;
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
//create category
export const createCategory = async (categoryData: { name: string }[]) => {
  try {
    const category = await prisma.category.createMany({
      data: categoryData,
    });
    return category;
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      throw new CustomError(`Prisma error '${err.code}' occured`, 500);
    }
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
    if (order.status === "pending") {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId, restaurantId: restaurantId },
        data: { status: "processing" },
        include: {
          User: true,
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
    if (order.status === "processing") {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId, restaurantId: restaurantId },
        data: { status: "ready" },
        include: {
          User: true,
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
    if (order.status === "ready") {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId, restaurantId: restaurantId },
        data: { status: "on the way" },
        include: {
          User: true,
          CartItem: {
            include: {
              MenuItem: true,
            },
          },
        },
      });
      return updatedOrder;
    }
    //if order status == on the way
    if (order.status === "on the way") {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId, restaurantId: restaurantId },
        data: { status: "delivered" },
        include: {
          User: true,
          CartItem: {
            include: {
              MenuItem: true,
            },
          },
        },
      });
      return updatedOrder;
    }
    //if order status == delivered
    if (order.status === "delivered") {
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
