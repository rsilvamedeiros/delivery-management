import dotenv from "dotenv";
dotenv.config(); // Certifique-se de que isso está no início do arquivo

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI in db.js:", MONGO_URI); // Adicione este log para depuração

if (!MONGO_URI) {
  throw new Error("Please add your Mongo URI to .env");
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
