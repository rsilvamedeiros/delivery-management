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
  },
});

export default mongoose.models.Motorista ||
  mongoose.model("Motorista", MotoristaSchema);
