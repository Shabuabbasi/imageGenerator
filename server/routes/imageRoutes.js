import express from "express";
import authUser from "../middlewares/auth.js";
import imageGenerator from "../controller/imageController.js";

const imageRouter = express.Router();
imageRouter.post("/generate-image", authUser, imageGenerator);

export default imageRouter;
