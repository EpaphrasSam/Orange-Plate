import express, { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth"; //import auth service
import * as dataValidation from "../util/dataValidation"; //import data validation util
// import
import * as jwt from "../util/jwt"; //import token util

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: {
      name: string;
      email: string;
      password: string;
      phone: string;
    } = req.body;
    const validation = await dataValidation.validateUserSignUpData(user);
    const newUser = await authService.signUp(user);
    let token: string = await jwt.generateToken({
      id: newUser.id,
      name: newUser.name,
    });
    res
      .status(200)
      .json({ message: "User sign up successful", newUser, token });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//user/rider login controller
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: { email: string; password: string; role: string } = req.body;
    await dataValidation.validateLoginData(user);
    const loggedInUser = await authService.login(user);
    const token: string = await jwt.generateToken({
      id: loggedInUser.id,
      name: loggedInUser.name,
    });
    res.status(200).json({
      message: `${user.role} Login successful`,
      loggedInUser,
      token,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//resturant login controller
export const resturantLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant: { email: string; password: string } = req.body;
    const restaurantData = {
      email: restaurant.email,
      password: restaurant.password,
      role: "restaurant",
    };
    await dataValidation.validateLoginData(restaurantData);
    const loggedInRestaurant = await authService.resturantLogin(restaurantData);
    const token: string = await jwt.generateToken({
      id: loggedInRestaurant.id,
      name: loggedInRestaurant.name,
    });
    res.status(200).json({
      message: "Resturant Login successful",
      loggedInRestaurant,
      token,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//user forgot password controller
export const userForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: { email: string } = req.body;
    await dataValidation.validateForgotPasswordData(user);
    await authService.userForgotPassword(user);
    res.status(200).json({ message: "Password reset mail sent" });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//get user reset password controller
export const getUserResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ message: "Collect token from get reset password" });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};

//post user reset password controller
export const postUserResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userResetPasswordData: { newPassword: string; token: string } =
      req.body;
    await dataValidation.validateResetPasswordData(userResetPasswordData);
    const updatedUser: any = await authService.userResetPassword(
      userResetPasswordData
    );
    const token: string = await jwt.generateToken({
      id: updatedUser.id,
      name: updatedUser.name,
    });
    res.status(200).json({
      message: "Password reset successful",
      updatedUser,
      token,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message,
    });
  }
};
