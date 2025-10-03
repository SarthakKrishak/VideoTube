import dotenv from "dotenv"
dotenv.config();
import { connectDB } from "./db/db.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
         console.log(`🪒 Server is listning on ${process.env.PORT || 8000}`);
     })   
    })
    .catch((e) =>{
        console.log("MONGO DB Connection Failed",e);
    })


