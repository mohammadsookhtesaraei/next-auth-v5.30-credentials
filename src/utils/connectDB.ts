import mongoose from "mongoose";

const MONGOURL = process.env.MONGODB_URL!;




async function connectDB() {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("Already Connected!");
        };

        mongoose.set("strictQuery", false);

        await mongoose.connect(MONGOURL);
        console.log('ConnectDB!');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
            throw error;
        }
    }


};

export default connectDB;