import mongoose from "mongoose";

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
    // mongoose.set("debug", true);
};

export default connectDb;