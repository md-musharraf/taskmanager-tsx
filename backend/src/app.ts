import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api", authRouter);

export default app;
