import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
