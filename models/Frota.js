import mongoose from "mongoose";

const FrotaSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: [true, "Placa do veículo é obrigatória"],
    unique: true,
  },
  marca: {
    type: String,
    required: [true, "Marca do veículo é obrigatória"],
  },
  modelo: {
    type: String,
    required: [true, "Modelo do veículo é obrigatório"],
  },
  ano: {
    type: Number,
    required: [true, "Ano do veículo é obrigatório"],
  },
  status: {
    type: String,
    enum: ["Disponível", "Em Manutenção", "Em Uso"],
    default: "Disponível",
  },
});

export default mongoose.models.Frota || mongoose.model("Frota", FrotaSchema);
