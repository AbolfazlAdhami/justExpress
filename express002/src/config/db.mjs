import mongoose from "mongoose";

const mongodb_uri = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodb_uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};
