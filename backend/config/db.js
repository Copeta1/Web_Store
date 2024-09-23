import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:");
    process.exit(1); // 1 code means failure but 0 means success
  }
};
