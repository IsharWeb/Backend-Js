import mongoose from "mongoose"

const mongooseUserProdutSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            lowercase: true,
            require: [true, "User name must be Required"]
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            require: [true, "Email name must be Required"]
        },
        password: {
            type: String,
            unique: true,
            lowercase: true,
            require: [true, "Password name must be Required"]
        }
    }, { timestamps: true }
);

export const UserProdut = mongoose.model("UserProdut", mongooseUserProdutSchema)
