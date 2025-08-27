import { connect, disconnect } from "mongoose";

const connectDB = async () => {
  const URI = process.env.MONGODB_URI;
  if (!URI) throw new Error("MongoDB URI is not defined in the environment.");
  try {
    await connect(URI);
  } catch (error) {
    console.log(error);
    throw new Error("Cannot connect to MongoDB");
  }
};

const disconnectDB = async () => {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Cannot disconnect to MongoDB");
  }
};

export { connectDB, disconnectDB };
