//import prisma.ts file
import prisma from "../util/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import CustomError from "../util/error";
import * as bcrypt from "../util/bcrypt";
import { sendEmail } from "../util/email";
import * as jwt from "../util/jwt";

// sign up service
interface signUpData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface loginData {
  email: string;
  password: string;
}

// user sign up service
export const signUp = async (userData: signUpData) => {
  try {
    const hashedPassword = await bcrypt.hashPassword(userData.password);
    const user: signUpData = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
    };
    const newUser = await prisma.user.create({
      data: user,
    });
    return newUser;
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new CustomError("Email already exists", 409);
      }
      throw new CustomError(`Prisma Error: ${err.message}`, 500);
    }
    throw new CustomError(`Sign Up faild: ${err}`, 409);
  }
};

//user login service
export const login = async (loginData: loginData) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: loginData.email },
    });

    if (!user) {
      throw new CustomError("User not found", 404);
    }
    //verify password
    const isPasswordValid = await bcrypt.verifyPassword(
      loginData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new CustomError("Invalid password: password is not correct", 401);
    }
    //return user without password and createdAt
    const { password, createdAt, ...userData } = user;
    return userData;
  } catch (err: any) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new CustomError(`Login failed: ${err.message}`, 500);
  }
};

//resturant login service
export const resturantLogin = async (resturantData: loginData) => {
  try {
    const resturant = await prisma.restaurant.findUnique({
      where: { email: resturantData.email },
    });
    if (!resturant || !resturant.password) {
      throw new CustomError("Restaurant not found or invalid credentials", 404);
    }
    //verify password
    const isPasswordValid = await bcrypt.verifyPassword(
      resturantData.password,
      resturant.password
    );
    if (!isPasswordValid) {
      throw new CustomError("Invalid password: password is not correct", 401);
    }
    const { password, createdAt, ...logedinResturantData } = resturant;
    return logedinResturantData;
  } catch (err: any) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new CustomError(`Login failed: ${err.message}`, 500);
  }
};

//user forgot password service
export const userForgotPassword = async (userData: { email: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    //generate token
    let token = await jwt.generateToken({ id: user.id, name: user.name });
    token = token.split(" ")[1];
    //send email to user with password reset link
    const resetLink = `${process.env.BASE_URL}/authentication/user/reset-password?token=${token}`;
    console.log(resetLink);
    const emailContent = `
      <p>You requested to change your password. Click the following link to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
    `;
    await sendEmail(user.email, "Password Reset", emailContent);
    return user;
  } catch (err: any) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new CustomError(`Forgot password failed: ${err.message}`, 500);
  }
};

//user reset password service
export const userResetPassword = async (userData: {
  newPassword: string;
  token: string;
}) => {
  try {
    const user = await jwt.verifyToken(userData.token);
    //convert JWT Issued At unix timestamp to date
    const iatDate = new Date(user.iat * 1000);
    const currentTime = new Date();
    // Calculate the difference in minutes
    const timeDifference =
      (currentTime.getTime() - iatDate.getTime()) / (1000 * 60);
    // Check if the token was issued more than 5 minutes ago
    if (timeDifference > 5) {
      throw new CustomError(
        "Token has expired. Please request a new password reset.",
        401
      );
    }
    const hashedPassword = await bcrypt.hashPassword(userData.newPassword);
    // console.log(hashedPassword);
    const updatedUser: any = await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    const { password, createdAt, ...updatedUserData } = updatedUser;
    return updatedUserData;
  } catch (err: any) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new CustomError(`Reset password failed: ${err.message}`, 500);
  }
};
