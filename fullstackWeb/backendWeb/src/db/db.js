import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectDbHost = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`,
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true
            // }
        );

        console.log(`\n✅ MongoDB connected!! On Host: ${connectDbHost.connection.host}`);
    } catch (error) {
        console.log("❌ DB Connection Error =", error);
        process.exit(1);
    }
};

// let url = 'mongodb+srv://isharwebdeveloper:isharkhan601@cluster0.causgax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// const connectDB = async () => {

//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         console.log('Databaise connecte sucessfuly');
//     } catch (error) {
//         console.log("Mongo DB connecting error ", error);
//         process.exit(1);
//     }

// }

// const connectDB =  mongoose.connect(`${url}/${DB_NAME}`,  function(err, db) {
//     if (err) {
//         console.log('Db conecting error');
//         db.close
//     }
//         console.log("DB connect successfull");
//         db.close();

// }) 

export default connectDB;