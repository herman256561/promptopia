import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("MongoDB is already connected");
        return;
    }

    // Connect to a cluster called "share_prompt" using MONGODB_URI in .env
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
        })

        isConnected=true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}