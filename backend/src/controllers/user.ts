import express, { Request, Response, NextFunction } from "express";
import CustomError from "../util/error";
import * as jwt from "../util/jwt";
import * as dataValidation from "../util/dataValidation";
import * as userService from "../services/user";

export const home = async (req: Request, res: Response, next: NextFunction) => {
  const userLocation: { latitude: number; longitude: number } = req.body;
  const token: any = req.headers.authorization;
  try {
    await jwt.verifyToken(token);
    await dataValidation.validateUserLocationData(userLocation);
    const restaurants = await userService.restaurantCloseBy(userLocation);
    const allRestaurants = await userService.getAllRestaurants();
    const categoriesWithMenuItems = await userService.getAllCategories();

    const menuItems = (
      await Promise.all(
        restaurants.map((restaurant) =>
          restaurant.menuItems.map((item) => ({
            ...item,
            restaurantName: restaurant.name,
          }))
        )
      )
    ).flat();
    const restaurantsWithoutMenuItems = restaurants.map((restaurant) => {
      const { menuItems, password, ...restaurantWithoutMenuItems } = restaurant;
      return restaurantWithoutMenuItems;
    });
    res.status(200).json({
      message: "Welcome to the home page",
      restaurantsWithoutMenuItems,
      menuItems,
      categoriesWithMenuItems,
      search: allRestaurants,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//get all restaurants
export const getAllRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurants = await userService.getAllRestaurants();
    res.status(200).json({
      message: "Restaurants fetched successfully",
      restaurants,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

export const getMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const token: any = req.headers.authorization;
  await jwt.verifyToken(token);
  await dataValidation.getById(id);
  const menuItem = await userService.getMenuItem(id);
  res.status(200).json({
    message: "Menu item fetched successfully",
    menuItem,
  });
  try {
    await jwt.verifyToken(token);
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//add to cart
export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.id;
    const { menuItemId, quantity }: { menuItemId: string; quantity: number } =
      req.body;
    const token: any = req.headers.authorization;
    await jwt.verifyToken(token);
    await dataValidation.validateAddToCartData(menuItemId, quantity);
    const newCartItem = await userService.addToCart(
      menuItemId,
      quantity,
      userId
    );
    res.status(200).json({
      message: "Item added to cart successfully",
      newCartItem,
    });
  } catch (error: any) {
    next({
      status: error.statusCode || 400,
      message: error.message,
    });
  }
};

//edit cart item
export const editCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItemId: string = req.params.id;
    const quantity: number = req.body.quantity;
    const token: any = req.headers.authorization;
    const user = await jwt.verifyToken(token);
    await dataValidation.validateEditCartItemData(quantity);
    const updatedCartItem = await userService.editCartItem(
      cartItemId,
      user.id,
      quantity
    );
    res.status(200).json({
      message: "Cart item edited successfully",
      updatedCartItem,
    });
  } catch (error: any) {
    next({
      status: error.statusCode || 400,
      message: error.message,
    });
  }
};

export const deleteCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItemId: string = req.params.id;
    const token: any = req.headers.authorization;
    const user = await jwt.verifyToken(token);
    await dataValidation.getById(cartItemId);
    await userService.deleteCartItem(cartItemId, user.id);
    res.status(200).json({
      message: "Cart item deleted successfully",
    });
  } catch (error: any) {
    next({
      status: error.statusCode || 400,
      message: error.message,
    });
  }
};

//get cart items
export const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.id;
    const token: any = req.headers.authorization;
    await jwt.verifyToken(token);
    await dataValidation.getById(userId);
    const cartItems = await userService.getCartItems(userId);
    res.status(200).json({
      message: "Cart items fetched successfully",
      cartItems,
    });
  } catch (error: any) {
    next({
      status: error.statusCode || 400,
      message: error.message,
    });
  }
};

//place order
export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.id;
    const {
      total,
      restaurantId,
      cartItems,
      customerLatitude,
      customerLongitude,
    }: {
      total: number;
      restaurantId: string;
      customerLatitude: number;
      customerLongitude: number;
      cartItems: [];
    } = req.body;
    const token: any = req.headers.authorization;
    await jwt.verifyToken(token);
    await dataValidation.validatePlaceOrderData(
      total,
      restaurantId,
      cartItems,
      customerLatitude,
      customerLongitude
    );
    const order = await userService.placeOrder(
      userId,
      total,
      restaurantId,
      cartItems,
      customerLatitude,
      customerLongitude
    );
    res.status(200).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error: any) {
    next({
      status: error.statusCode || 400,
      message: error.message,
    });
  }
};

//get user orders
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.params.id;
    const token: any = req.headers.authorization;
    await jwt.verifyToken(token);
    await dataValidation.getById(userId);
    const orders = await userService.getOrders(userId);
    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error: any) {
    next({
      status: error.statusCode || 400,
      message: error.message,
    });
  }
};
