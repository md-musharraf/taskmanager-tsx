import { Request, Response } from "express";
import { LoginUser, RegisterUser } from "../types/types";
import { registerUserService } from "../services/auth.service";

export const registerUser = async (req: Request<{}, {}, RegisterUser>, res: Response) => {
  try {
    const result = await registerUserService(req.body);

    return res.cookie("token", result.token, {}).status(201).json({
      message: "Register success",
      user: result.user,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Unexpected error",
    });
  }
};

// const { name, email, password, confirmPassword } = req.body;

//   try {
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Password do not match" });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const existingUser = await authModel.findOne({ email });

//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const newUser = await authModel.create({ name, email, password: hashedPassword });

//     const jwtSecret = process.env.JWT_SECRET_KEY;

//     if (!jwtSecret) {
//       throw new Error("JWT_SECRET_KEY missing");
//     }

//     const token = jwt.sign({ id: newUser._id }, jwtSecret as string, {
//       expiresIn: "7d",
//     });

//     const { password: _, ...safeUser } = newUser.toObject();

//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       })
//       .status(201)
//       .json({
//         message: "Register success",
//         user: safeUser,
//       });
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message);
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: "An unexpected error occurred" });
//     }
//   }
