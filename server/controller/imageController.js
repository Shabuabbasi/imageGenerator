import userModel from "../models/userModels.js";
import FormData from "form-data";
import axios from "axios";
import express from "express";

export const imageGenerator = async (req, res) => {
  try {
    // const { userId, prompt } = req.body;

    const { prompt } = req.body;
    const user = await userModel.findById(req.userId);
    if (!user || !prompt) {
      return res.json({
        success: false,
        message: "User not found or prompt is missing",
      });
    }
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "No Suffient creditBalance ",
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

   
    user.creditBalance -= 1;
    const savedUser = await user.save();
  

    return res.json({
      success: true,
      message: "Image generated successfully",
      creditBalance: savedUser.creditBalance,
      resultImage,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message || "Image generation failed",
    });
  }
};
export default imageGenerator;
