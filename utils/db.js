import dotenv from "dotenv";
dotenv.config(); // Certifique-se de que isso está no início do arquivo

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI no db.js:", MONGO_URI); // Log para depuração

if (!MONGO_URI) {
  throw new Error("Por favor, adicione sua URI do MongoDB ao arquivo .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    console.log("Usando a conexão de banco de dados existente.");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Iniciando a conexão com o MongoDB...");

    cached.promise = mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((mongoose) => {
        console.log("Conectado ao MongoDB com sucesso!");
        return mongoose;
      })
      .catch((error) => {
        console.error("Erro ao conectar ao MongoDB:", error.message);
        throw error; // Re-throw the error after logging it
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
