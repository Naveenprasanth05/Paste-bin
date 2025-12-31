import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Successfully Connected:", db.connection.host);
    } catch (error) {
        console.error("Database not connected", error.message);
        process.exit(1);
    }
};

export default connectDB; // ✅ use ES module export
