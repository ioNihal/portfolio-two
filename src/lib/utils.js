import mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()

export const connectToDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    const connection = {};

    try {
        if (connection.isConnected) return;
        const db = await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error)
        await mongoose.disconnect();
        throw new Error(error);
    }

}