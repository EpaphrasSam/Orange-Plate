import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../util/prisma"; //import prisma.ts file
import CustomError from "../util/error";
import * as bcrypt from "../util/bcrypt";

//create a new restaurant
export const createRestaurant = async (data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
}) => {
  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
    return restaurant;
  } catch (err: any) {
    //check if the error is a prisma error
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new CustomError("Restaurant already exists", 400);
      }
    }
    throw new CustomError(err.message, err.statusCode);
  }
};

export const createCategory = async (
  categoryData: { name: string; image: string }[]
) => {
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

export const createRider = async (data: {
  name: string;
  email: string;
  phone: string;
  vehicle_type: string;
  lincenseNumber: string;
  vehicleNumber: string;
}) => {
  try {
    const hashedPassword = await bcrypt.hashPassword(data.phone);
    const rider = await prisma.rider.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        vehicle_type: data.vehicle_type,
        lincenseNumber: data.lincenseNumber,
        vehicleNumber: data.vehicleNumber,
        password: hashedPassword,
      },
    });
    return rider;
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode);
  }
};
