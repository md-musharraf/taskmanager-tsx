import express from "express";
import { loginUserController, registerUserController } from "../controller/auth.controller";

const router = express.Router();

router.post("/auth/register", registerUserController);

router.post("/auth/login", loginUserController);

export default router;
