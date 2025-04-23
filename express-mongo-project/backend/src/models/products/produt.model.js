import mongoose from "mongoose";
const orderItemsSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
        },
        quintity: {
            type: Number,
            require: true
        }
    }
)
const mongooseProductsSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            require: true,
        },
        discription: {
            type: String,
            require: true,
        },
        productImg: {
            type: Number
        },
        productPrice: {
            type: Number,
            default: 0
        },
        stok: {
            type: Number,
            default: 0
        },
        categorys: {
            type: mongoose.Schema.Types.ObjectId,
            rep: "Catagorys",
            require: true,
        },
        Owner: {
            type: mongoose.Schema.Types.ObjectId,
            rep: "UserProdut",
            require: true,
        },
        costomer: {
            type: mongoose.Schema.Types.ObjectId,
            rep: "UserProdut",
            require: true,
        },
        orderItems: {
            type: [orderItemsSchema]
        },
        status: {
            type: String,
            enum: ["PINDING", "CANCEL", "DEVLIVER"],
            default: "PINDING",
        },
        adress: [
            {
                contrys: {
                    type: String,
                    require: true,
                },
                city: {
                    type: String,
                    require: true,
                },
                pinCode: {
                    type: Number,
                    require: true,
                },
                strate: {
                    type: String,
                    require: true,
                }
            }
        ]

    }, { timestamps: true }
);

export const Products = mongoose.model("Products", mongooseProductsSchema)