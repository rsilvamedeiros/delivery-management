// models/Veiculo.js
import mongoose from "mongoose";

const VeiculoSchema = new mongoose.Schema({
  modelo: {
    type: String,
    required: [true, "Modelo do veículo é obrigatório"],
  },
  marca: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Marca",
    required: [true, "Marca do veículo é obrigatória"],
  },
  placa: {
    type: String,
    required: [true, "Placa do veículo é obrigatória"],
  },
  ano: {
    type: Number,
    required: [true, "Ano do veículo é obrigatório"],
  },
  valorFIPE: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TabelaFIPE",
  },
});

export default mongoose.models.Veiculo ||
  mongoose.model("Veiculo", VeiculoSchema);
