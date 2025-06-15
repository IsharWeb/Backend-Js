import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError";
import AsyncHandler from "../utils/AsyncHandler";
import jwt from "jsonwebtoken";

export const verifyJWT = AsyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(402, "Unauthorized request: Token not provided");
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw new ApiError(403, "Invalid or expired token");
    }

    const user = await User.findById(decoded?._id).select(
        "-password -refrashToken"
    );

    if (!user) {
        throw new ApiError(404, "User not found with this token");
    }

    req.user = user; // Attach user to the request
    next(); // Proceed to the next middleware/route handler
});
