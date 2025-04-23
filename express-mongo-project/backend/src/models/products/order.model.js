import mongoose from "mongoose";

const mongooseOrdersSchema = new mongoose.Schema(
    {

    }, { timestamps: true }
);

export const Orders = mongoose.model("Orders", mongooseOrdersSchema)