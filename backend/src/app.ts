import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import todoRouter from "./routes/todo.routes";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", todoRouter);

export default app;
