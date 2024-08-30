import bcrypt from "bcrypt";
import CustomError from "../util/error";

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err: any) {
    throw new CustomError("Something went wrong: password was not hashed", 500);
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  } catch (err: any) {
    throw new CustomError(
      "Something went wrong: password was not verified",
      500
    );
  }
};
