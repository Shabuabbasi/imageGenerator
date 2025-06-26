import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details " });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      creditBalance: 5, // Default credits for new users
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        creditBalance: user.creditBalance,
      },
    });
  } catch (error) {
    console.error("Error in userValidator:", error);
    res.json({ success: false, message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
        user: {
          name: user.name,
          creditBalance: user.creditBalance,
        },
      });
    } else {
      return res.json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error in userValidator:", error);
    res.json({ success: false, message: error.message });
  }
};
const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: {
        name: user.name,
        creditBalance: user.creditBalance,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { userRegister, userLogin, userCredits };
