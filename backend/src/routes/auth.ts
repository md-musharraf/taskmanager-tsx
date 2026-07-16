import authModel from "../models/auth.model";
import { RegisterUser } from "./../types/types";
import { LoginUser } from "./../types/types";
import express, { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/auth/register-user", async (req: Request<{}, {}, RegisterUser>, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await authModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await authModel.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "7d",
    });

    const { password: _, ...safeUser } = newUser.toObject();

    await newUser.save();

    res.cookie("token", token, {}).status(200).json({
      message: "Register success",
      user: safeUser,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

router.post("/auth/login-user", async (req: Request<{}, {}, LoginUser>, res) => {
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

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "7d",
    });

    const { password: _, ...user } = existingUser.toObject();

    res.cookie("token", token, {}).status(200).json({ user: user, message: "Login successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

export default router;
