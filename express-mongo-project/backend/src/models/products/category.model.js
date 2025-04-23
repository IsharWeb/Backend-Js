import mongoose from "mongoose";

const mongooseCategorysSchema = new mongoose.Schema(
    {
        type: String,
        require: true
    }
    // ,{timestamps: true}
);

export const Catagorys = mongoose.model("Catagorys", mongooseCategorysSchema)