// server/config/mongodb.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load .env

const connectDB = async () => {
  try {
    const URI = `${process.env.MONGO_URI}ImageZ`; // ✅ Ensure this is correct
    await mongoose.connect(URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

export default connectDB;
