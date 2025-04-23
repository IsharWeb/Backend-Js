import mongoose from "mongoose";

const mongooseCategorysSchema = new mongoose.Schema(
    {
        
    }
    // ,{timestamps: true}
);

export const Catagorys = mongoose.model("Catagorys", mongooseCategorysSchema)