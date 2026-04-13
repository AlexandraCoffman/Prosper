import mongoose from "mongoose";

const setup = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("URI not found in environment variables");
  }

  await mongoose.connect(uri, {
    // Many hosts (e.g. Render) prefer IPv6 first; Atlas often works more reliably over IPv4.
    family: 4,
    serverSelectionTimeoutMS: 10_000,
  });
  console.log("Connected to MongoDB");
};

export default setup;
