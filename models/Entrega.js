// models/Entrega.js
import mongoose from "mongoose";

const EntregaSchema = new mongoose.Schema({
  endereco: {
    type: String,
    required: [true, "Endereço é obrigatório"],
  },
  dataEntrega: {
    type: Date,
    required: [true, "Data de entrega é obrigatória"],
  },
  status: {
    type: String,
    required: [true, "Status é obrigatório"],
  },
  motorista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Motorista",
    required: [true, "Motorista é obrigatório"],
  },
  veiculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Veiculo",
    required: [true, "Veículo é obrigatório"],
  },
});

export default mongoose.models.Entrega ||
  mongoose.model("Entrega", EntregaSchema);
