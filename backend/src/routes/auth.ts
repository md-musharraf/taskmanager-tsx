import authModel from "../models/auth.model";
import { LoginUser } from "./../types/types";
import express, { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerController } from "../controller/auth.controller";

const router = express.Router();

router.post("/auth/register", registerController);

router.post("/auth/login", async (req: Request<{}, {}, LoginUser>, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await authModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "Email not found" });
    }

    const verifyPassword = await bcrypt.compare(password, existingUser.password as string);

    if (!verifyPassword) {
      return res.status(401).json({
        message: "Password do not match",
      });
    }

    const jwtSecret = process.env.JWT_SECRET_KEY;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET_KEY missing");
    }

    const token = jwt.sign({ id: existingUser._id }, jwtSecret as string, {
      expiresIn: "7d",
    });

    const { password: _, ...user } = existingUser.toObject();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ user: user, message: "Login successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

export default router;
