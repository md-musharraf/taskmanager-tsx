import { RegisterUser } from "./../types/types";
import express, { Request, Response } from "express";
const router = express.Router();

router.post("/auth/register-user", async (req: Request<{}, {}, RegisterUser>, res) => {
  console.log(req.body);
});

export default router;
