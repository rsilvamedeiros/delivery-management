// models/Motorista.js
import mongoose from "mongoose";

const MotoristaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome do motorista é obrigatório"],
  },
  cnh: {
    type: String,
    required: [true, "CNH do motorista é obrigatória"],
    unique: true,
  },
  telefone: {
    type: String,
    required: [true, "Telefone do motorista é obrigatório"],
  },
  endereco: {
    type: String,
    required: [true, "Endereço do motorista é obrigatório"],
  },
});

export default mongoose.models.Motorista ||
  mongoose.model("Motorista", MotoristaSchema);
