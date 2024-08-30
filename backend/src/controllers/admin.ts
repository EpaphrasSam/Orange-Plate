import { Request, Response, NextFunction } from "express";
import CustomError from "../util/error";
import * as dataValidation from "../util/dataValidation";
import * as adminService from "../services/admin";

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
