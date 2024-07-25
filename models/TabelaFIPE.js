// models/TabelaFIPE.js
import mongoose from "mongoose";

const TabelaFIPESchema = new mongoose.Schema({
  modelo: {
    type: String,
    required: [true, "Modelo do veículo é obrigatório"],
  },
  ano: {
    type: Number,
    required: [true, "Ano do veículo é obrigatório"],
  },
  valor: {
    type: Number,
    required: [true, "Valor do veículo é obrigatório"],
  },
});

export default mongoose.models.TabelaFIPE ||
  mongoose.model("TabelaFIPE", TabelaFIPESchema);
