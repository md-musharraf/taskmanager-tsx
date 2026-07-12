import app from "./app";
import dotenv from "dotenv";
import connectDB from "./db/db";

dotenv.config();

const startServer = async () => {
  await connectDB();

  app.listen(3000, () => {
    console.log("Port is running on 3000");
  });
};

startServer();
