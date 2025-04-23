import mongoose from "mongoose";

const mongooseTodoSchema = mongoose.Schema(
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
        subTodos: [
            {
                type: mongoose.Schema.Types, ObjectId,
                ref: "SubTodos"
            }
        ]

    }, { timestumps: true }
)

export const TodoSchema = mongoose.model("TodoSchema", mongooseTodoSchema)
