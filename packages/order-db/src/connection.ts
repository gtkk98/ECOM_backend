import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDB = async () => {
    const mongoUrl = (
        globalThis as typeof globalThis & {
            process?: {
                env?: Record<string, string | undefined>;
            };
        }
    ).process?.env?.MONGO_URL;

    if (isConnected) return;

    if (!mongoUrl) {
        throw new Error("MONGO_URL is not defined in env file");
    }

    try {
        await mongoose.connect(mongoUrl);
        isConnected = true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};