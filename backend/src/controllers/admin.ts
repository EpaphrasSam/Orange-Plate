import { Request, Response, NextFunction } from "express";
import CustomError from "../util/error";
import * as dataValidation from "../util/dataValidation";
import * as adminService from "../services/admin";

export const createCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryData: {
      name: string;
      image: string;
    }[] = req.body;
    await dataValidation.createCategoryData(categoryData);
    const newCategory = await adminService.createCategory(categoryData);
    res.status(200).json({
      message: "Category created successfully",
      newCategory,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};
export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurantData: {
      name: string;
      email: string;
      phone: string;
      address: string;
      latitude: number;
      longitude: number;
      // openingHours: string;
      // closingHours: string;
    } = req.body;
    await dataValidation.validateCreateRestaurantData(restaurantData);
    const newRestaurant = await adminService.createRestaurant(restaurantData);
    res.status(200).json({
      message: "Restaurant created successfully",
      newRestaurant,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//create rider controller
export const createRider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const riderData: {
      name: string;
      email: string;
      phone: string;
      vehicle_type: string;
      lincenseNumber: string;
      vehicleNumber: string;
    } = req.body;
    await dataValidation.validateCreateRiderData(riderData);
    const newRider = await adminService.createRider(riderData);
    res.status(200).json({
      message: "Rider created successfully",
      newRider,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, newPassword, role } = req.body;
    await dataValidation.resetPasswordData(email, newPassword, role);
    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};
