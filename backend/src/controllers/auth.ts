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

//user login controller
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: { email: string; password: string } = req.body;
    await dataValidation.validateUserLoginData(user);
    const loggedInUser = await authService.login(user);
    const token: string = await jwt.generateToken({
      id: loggedInUser.id,
      name: loggedInUser.name,
    });
    res.status(200).json({
      message: "User Login successful",
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
    const resturant: { email: string; password: string } = req.body;
    await dataValidation.validateUserLoginData(resturant);
    const loggedInResturant = await authService.resturantLogin(resturant);
    const token: string = await jwt.generateToken({
      id: loggedInResturant.id,
      name: loggedInResturant.name,
    });
    res.status(200).json({
      message: "Resturant Login successful",
      loggedInResturant,
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
