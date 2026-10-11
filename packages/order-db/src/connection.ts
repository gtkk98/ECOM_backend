import mongoose from "mongoose";

declare const process: {
  env: Record<string, string | undefined>;
};

let isConnected = false;

export const connectOrderDB = async () => {
  if (isConnected) return;

  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined in the environment");
  }

  await mongoose.connect(mongoUrl);
  isConnected = true;
  console.log("Connected to MongoDB");
};
