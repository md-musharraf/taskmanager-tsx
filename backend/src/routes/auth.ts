import authModel from "../models/auth.model";
import { RegisterUser } from "./../types/types";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/auth/register-user", async (req: Request<{}, {}, RegisterUser>, res) => {
  const { name, email, password, confirmPassword } = req.body;

  console.log(name, email, password, confirmPassword);

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

  await newUser.save();
});

export default router;
