import mongoose from "mongoose";

const EntregaSchema = new mongoose.Schema({
  endereco: String,
  dataEntrega: Date,
  status: String,
  motorista: String,
  veiculo: String,
});

export default mongoose.models.Entrega ||
  mongoose.model("Entrega", EntregaSchema);
