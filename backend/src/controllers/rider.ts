import { Request, Response, NextFunction } from "express";
import CustomError from "../util/error";
import * as dataValidation from "../util/dataValidation";
import * as jwt from "../util/jwt";
import * as riderService from "../services/rider";

//rider home
export const riderHome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.authorization;
  const riderId: string = req.params.id;
  const riderLocation: { latitude: number; longitude: number } = req.body;
  try {
    await jwt.verifyToken(token);
    await dataValidation.getById(riderId);
    await dataValidation.validateUserLocationData(riderLocation);
    await riderService.updateLocation(riderId, riderLocation);
    const rider = await riderService.getRider(riderId);
    res.status(200).json({
      message: "Welcome to the rider home page",
      rider,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message || "Error fetching rider home",
    });
  }
};
