import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`Mongo DB connected | DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error in Connecting DB");
        console.log(error.message);
        process.exit(1);
    }
}