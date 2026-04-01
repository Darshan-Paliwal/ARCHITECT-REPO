import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "architect",
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Error:", error);
    throw new Error("DB Connection Failed");
  }
};
