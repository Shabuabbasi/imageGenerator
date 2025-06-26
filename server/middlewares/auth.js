import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorize Login Again",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id; // Attach user ID to request object
    if (token_decode.id) {
      req.body.userId = token_decode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Autorize login",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
