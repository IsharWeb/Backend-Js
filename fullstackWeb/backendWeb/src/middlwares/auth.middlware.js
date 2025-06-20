import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";

export const verifyJWT = AsyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("🔐 Received Token:", token);

    if (!token || token === "process.env.ACCESS_TOKEN_SECRET") {
      console.error("🚨 Invalid token string received:", token);
      throw new ApiError(401, "Unauthorized token");
    }


    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("✅ Token Decoded:", decodedToken);

    const user = await User.findById(decodedToken?._id).select("-password -refrashToken");

    if (!user) {
      console.log("❌ User not found with this token");
      throw new ApiError(401, "Invalid Access Token");
    }

    console.log("👤 User found:", user.username);

    req.user = user;
    next();
  } catch (error) {
    console.error("❗ JWT verification error:", error?.message);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
