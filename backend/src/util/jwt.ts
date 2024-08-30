import CustomError from "../util/error";
import jwt from "jsonwebtoken";

export const generateToken = async (payload: { id: string; name: string }) => {
  try {
    const jwtKey: any = process.env.JWT_KEY;
    if (!jwtKey) {
      throw new CustomError(
        "Something went wrong: JWT_KEY is not defined",
        500
      );
    }
    let token: string = await jwt.sign(payload, jwtKey, {
      algorithm: "HS256",
    });
    token = `Bearer ${token}`;
    return token;
  } catch (err: any) {
    throw new CustomError("Something went wrong: token was not generated", 500);
  }
};

export const verifyToken = async (token: string) => {
  try {
    if (!token) {
      throw new CustomError("Token is required", 401);
    }
    const jwtKey: any = process.env.JWT_KEY;
    if (!jwtKey) {
      throw new CustomError(
        "Something went wrong: JWT_KEY is not defined",
        500
      );
    }
    token = token.split(" ")[1];
    const user: any = await jwt.verify(token, jwtKey);
    return user;
  } catch (err: any) {
    throw new CustomError(err.message, err.statusCode || 401);
  }
};
