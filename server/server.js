// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { userLogin, userRegister } from "./controller/userController.js";
import connectDB from "./config/mongodb.js";
import imageRouter from "./routes/imageRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

const startServer = async () => {
  try {
    await connectDB();

    app.use("/api/users", userRoutes);
    app.use("/api/image", imageRouter);
    // Use user routes under /api/users

    app.get("/", (req, res) => {
      res.send("API is running...");
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1); // Exit process on failure
  }
};

startServer();
