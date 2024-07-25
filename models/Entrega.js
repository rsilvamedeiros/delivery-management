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
    type: String,
    required: [true, "Motorista é obrigatório"],
  },
  veiculo: {
    type: String,
    required: [true, "Veículo é obrigatório"],
  },
});

export default mongoose.models.Entrega ||
  mongoose.model("Entrega", EntregaSchema);
