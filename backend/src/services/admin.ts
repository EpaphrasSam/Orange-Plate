import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../util/prisma"; //import prisma.ts file
import CustomError from "../util/error";

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
