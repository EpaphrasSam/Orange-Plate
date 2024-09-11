import { Request, Response, NextFunction } from "express";
import CustomError from "../util/error";
import * as dataValidation from "../util/dataValidation";
import * as resturantService from "../services/resturant";
import * as jwt from "../util/jwt";
import * as notification from "../util/notification";

//get restaurant by id
export const getRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    const restaurantId: string = req.params.id;
    await jwt.verifyToken(token);
    await dataValidation.getById(restaurantId);
    const restaurant = await resturantService.getRestaurantById(restaurantId);
    const menuItems = restaurant?.menuItems.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      price: item.price,
      option: item.option,
      categoryName: item.category.name,
      categoryId: item.category.id,
    }));
    res.status(200).json({
      status: "Restaurant fetched successfully",
      // restaurant,
      menuItems,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//create password
export const createPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    await dataValidation.validateCreatePasswordData(email, password);
    const restaurantData = await resturantService.createPassword(
      email,
      password
    );
    res.status(200).json({
      status: "Password created successfully",
      restaurantData,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//update restaurant
export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurantId: string = req.params.id;
    const token: any = req.headers.authorization;
    const restaurantData: {
      name: string;
      phone: string;
      address: string;
      latitude: number;
      longitude: number;
      image: string;
      openingHours: string;
      closingHours: string;
    } = req.body;
    await jwt.verifyToken(token);
    await dataValidation.validateUpdateRestaurantData(restaurantData);
    const updatedRestaurant = await resturantService.updateRestaurant(
      restaurantData,
      restaurantId
    );
    res.status(200).json({
      status: "Restaurant updated successfully",
      updatedRestaurant,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//create menu
export const createMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuItems: {
      name: string;
      description: string;
      price: number;
      option: string;
      image: string;
      categoryId: string;
    }[] = req.body;
    const restaurantId: string = req.params.id;

    const menuItemsData = menuItems.map((item) => ({
      ...item,
      restaurantId,
    }));
    console.log(menuItemsData);
    const token: any = req.headers.authorization;
    await jwt.verifyToken(token);
    await dataValidation.validateMenuData(menuItemsData);
    const menu = await resturantService.createMenu(menuItemsData);
    res.status(200).json({
      status: "Menu created successfully",
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

// update menu item
export const updateMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuItemId: string = req.params.id;
    const menuItemData: {
      name: string;
      description: string;
      option: string;
      price: number;
      image: string;
      categoryId: string;
    } = req.body;
    const token: any = req.headers.authorization;
    const user: any = await jwt.verifyToken(token);
    await dataValidation.validateUpdateMenuItemData(menuItemData, menuItemId);
    console.log(user.id);
    const updatedMenuItem = await resturantService.updateMenuItem(
      menuItemData,
      menuItemId
    );
    res.status(200).json({
      status: "Menu item updated successfully",
      updatedMenuItem,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//delete menu item
export const deleteMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuItemId: string = req.params.id;
    const token: any = req.headers.authorization;
    const user: any = await jwt.verifyToken(token);
    await dataValidation.getById(menuItemId);
    const deletedMenuItem = await resturantService.deleteMenuItem(
      menuItemId,
      user.id
    );
    res.status(200).json({
      status: "Menu item deleted successfully",
      deletedMenuItem,
    });
  } catch (error: any) {
    next({
      status: error.statusCode || 400,
      message: error.message,
    });
  }
};

//get all categories
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    await jwt.verifyToken(token);
    const categories = await resturantService.getAllCategories();
    res.status(200).json({
      status: "Categories fetched successfully",
      categories,
    });
  } catch (error: any) {
    next({
      status: error.statusCode || 400,
      message: error.message,
    });
  }
};

//get orders
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurantId: string = req.params.id;
    const token: any = req.headers.authorization;
    const user: any = await jwt.verifyToken(token);
    await dataValidation.getById(restaurantId);
    const orders = await resturantService.getOrders(restaurantId);
    res.status(200).json({
      status: "Orders fetched successfully",
      orders,
    });
  } catch (error: any) {
    next({
      status: error.statusCode || 400,
      message: error.message,
    });
  }
};

//get order
export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId: string = req.params.id;
    const token: any = req.headers.authorization;
    const user: any = await jwt.verifyToken(token);
    await dataValidation.getById(orderId);
    const order = await resturantService.getOrder(orderId, user.id);
    res.status(200).json({
      status: "Order fetched successfully",
      order,
    });
  } catch (error: any) {
    next({
      status: error.statusCode || 400,
      message: error.message,
    });
  }
};

//update order status
export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId: string = req.params.id;
    const token: any = req.headers.authorization;
    const user: any = await jwt.verifyToken(token);
    const updatedOrder = await resturantService.updateOrderStatus(
      orderId,
      user.id
    );
    await notification.sendOrderStatusNotification(
      updatedOrder.userId,
      updatedOrder.id,
      updatedOrder.status
    );
    res.status(200).json({
      status: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error: any) {
    next({
      status: error.statusCode || 400,
      message: error.message,
    });
  }
};
