import mongoose from "mongoose";

const mongooseSubTodosSchema = mongoose.Schema(
    {
        content: {
            type: String,
            require: [true, "User name must be Required"]
        },
        completed: {
            type: Boolean,
            default: false
        },
        admin: {
            type: mongoose.Schema.Types, ObjectId,
            ref: "User"
        },

    }, { timestumps: true }
)

export const SubTodos = mongoose.model("SubTodos", mongooseSubTodosSchema)
