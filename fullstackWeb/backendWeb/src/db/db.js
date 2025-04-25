import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n Mongodb was connected !! On Hoset ${connectionInstance.connect.host}`);


    } catch (error) {
        console.log("DB Connecton Error = ", error);
        process.exit(1)
    }

}

export default connectDB;