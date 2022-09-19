import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import CustomError from "./customError.js";

export const isUserExist = async (email) => {
  const registeredEmail = await User.exists({ email });
  if (registeredEmail) {
    const error = new CustomError(
      400,
      "REGISTERATION_ERROR",
      "E-Mail address already exists!"
    );
    throw error;
  }
};

export const authinticateUser = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new CustomError(
      401,
      "Unauthorized",
      "Invalid email or password!"
    );
    throw error;
  }
  const isCorrectPW = await bcrypt.compare(password, user.password);
  if (!isCorrectPW) {
    const error = new CustomError(
      401,
      "Unauthorized",
      "Invalid email or password!"
    );
    throw error;
  }
  return user;
};

export const generateJWT = (email, userId) => {
  const token = jwt.sign(
    {
      email,
      userId: userId.toString(),
    },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
  return token;
};

export async function preSaveUser(next) {
  const hashedPW = await bcrypt.hash(this.password, 12);
  this.password = hashedPW;
  next();
}
