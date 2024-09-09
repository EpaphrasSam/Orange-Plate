import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../util/prisma"; //import prisma.ts file
import CustomError from "../util/error";
import * as bcrypt from "../util/bcrypt";
import * as jwt from "../util/jwt";
import { point, distance } from "@turf/turf";

export const restaurantCloseBy = async (userLocation: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: {
        latitude: {
          gte: userLocation.latitude - 0.05, // 5km range
          lte: userLocation.latitude + 0.05,
        },
        longitude: {
          gte: userLocation.longitude - 0.05,
          lte: userLocation.longitude + 0.05,
        },
      },
      include: {
        menuItems: true,
      },
    });

    // Filter restaurants within a 5km radius
    const filteredRestaurants = restaurants.filter((restaurant) => {
      const userPoint = point([userLocation.longitude, userLocation.latitude]);
      const restaurantPoint = point([
        Number(restaurant.longitude),
        Number(restaurant.latitude),
      ]);
      const distanceInKm = distance(userPoint, restaurantPoint, {
        units: "kilometers",
      });
      return distanceInKm <= 5;
    });

    return filteredRestaurants;
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

export const getMenuItem = async (id: string) => {
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
    });
    if (!menuItem) {
      throw new CustomError("Menu item not found", 404);
    }
    return menuItem;
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 500);
  }
};

//add to cart
export const addToCart = async (
  menuItemId: string,
  quantity: number,
  userId: string
) => {
  try {
    const newCartItem = await prisma.cartItem.create({
      data: {
        menuItemId,
        quantity,
        userId,
      },
    });
    return newCartItem;
  } catch (error: any) {
    throw new CustomError(error.message, error.statusCode || 500);
  }
};

export const editCartItem = async (
  cartItemId: string,
  userId: string,
  quantity: number
) => {
  try {
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: cartItemId, userId },
      data: { quantity },
    });

    if (!updatedCartItem) {
      throw new CustomError("Cart item not found", 404);
    }
    return updatedCartItem;
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new CustomError("Cart item not found", 404);
      }
      throw new CustomError(error.message, 500);
    }
    console.log(error);
    throw new CustomError(error.message, error.statusCode || 500);
  }
};

export const deleteCartItem = async (cartItemId: string, userId: string) => {
  try {
    const deletedCartItem = await prisma.cartItem.delete({
      where: { id: cartItemId, userId },
    });
    return deletedCartItem;
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new CustomError("Cart item not found", 404);
      }
      throw new CustomError(error.message, 500);
    }
    throw new CustomError(error.message, error.statusCode || 500);
  }
};

//get cart items
export const getCartItems = async (userId: string) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId, orderId: null },
      include: {
        MenuItem: true,
      },
    });
    return cartItems;
  } catch (error: any) {
    throw new CustomError(error.message, error.statusCode || 500);
  }
};

// place order
export const placeOrder = async (
  userId: string,
  total: number,
  restaurantId: string,
  cartItems: string[],
  customerLatitude: number,
  customerLongitude: number
) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        restaurantId,
        latitude: customerLatitude,
        longitude: customerLongitude,
        CartItem: {
          connect: cartItems.map((id) => ({ id })),
        },
      },
    });
    return order;
  } catch (error: any) {
    throw new CustomError(error.message, error.statusCode || 500);
  }
};
