import express from "express";
import {
  userLogin,
  userRegister,
  userCredits,
} from "../controller/userController.js";
import authUser from "../middlewares/auth.js";

const userRoutes = express.Router();
userRoutes.post("/register", userRegister);
userRoutes.post("/login", userLogin);
userRoutes.get("/credits", authUser, userCredits);
export default userRoutes;
