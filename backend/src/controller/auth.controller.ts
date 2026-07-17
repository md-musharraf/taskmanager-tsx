import { Request, Response } from "express";
import { LoginUser, RegisterUser } from "../types/types";
import { registerUserService, loginUserService } from "../services/auth.service";

export const registerUserController = async (req: Request<{}, {}, RegisterUser>, res: Response) => {
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

export const loginUserController = async (req: Request<{}, {}, LoginUser>, res: Response) => {
  try {
    const result = await loginUserService(req.body);

    return res.cookie("token", result.token, {}).status(200).json({
      message: "Login successful",
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
