import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("✅ Database Connected");
  } catch (error) {
    console.log("❌ Database Connection Failed");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
