import mongoose from "mongoose";

const setup = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("URI not found in environment variables");
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
};

export default setup;
