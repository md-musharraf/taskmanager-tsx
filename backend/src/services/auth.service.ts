import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authModel from "../models/auth.model";
import { LoginUser, RegisterUser } from "../types/types";

export const registerUserService = async (data: RegisterUser) => {
  const { name, email, password, confirmPassword } = data;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const existingUser = await authModel.findOne({
    email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await authModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "7d",
    },
  );

  const { password: _, ...safeUser } = newUser.toObject();

  return {
    token,
    user: safeUser,
  };
};

export const loginUserService = async (data: LoginUser) => {
  const { email, password } = data;

  const existingUser = await authModel.findOne({
    email,
  });

  if (!existingUser) {
    throw new Error("Email not found");
  }

  const verifyPassword = await bcrypt.compare(password, existingUser.password as string);

  if (!verifyPassword) {
    throw new Error("Password does not match");
  }

  const token = jwt.sign(
    {
      id: existingUser._id,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "7d",
    },
  );

  const { password: _, ...user } = existingUser.toObject();

  return {
    token,
    user,
  };
};
