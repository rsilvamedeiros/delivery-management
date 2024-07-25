import dotenv from "dotenv";
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

import mongoose from "mongoose";
import connectToDatabase from "./utils/db.js";

async function testConnection() {
  try {
    const db = await connectToDatabase();
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  } finally {
    // Fecha a conexão com o banco de dados após o teste
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("Conexão com o MongoDB fechada.");
    }
  }
}

testConnection();
