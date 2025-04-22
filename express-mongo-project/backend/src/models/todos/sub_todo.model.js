import mongoose from "mongoose"

const userSchema = new mongoose.Schema({});

export const user = mongoose.model("User", userSchema)