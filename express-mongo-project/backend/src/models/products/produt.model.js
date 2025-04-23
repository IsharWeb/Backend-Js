import mongoose from "mongoose";

const mongooseProductsSchema = new mongoose.Schema(
    {

    }, { timestamps: true }
);

export const Products = mongoose.model("Products", mongooseProductsSchema)