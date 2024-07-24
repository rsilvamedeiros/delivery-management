import mongoose from "mongoose";

const VendaSchema = new mongoose.Schema({
  produto: String,
  quantidade: Number,
  valor: Number,
  dataVenda: Date,
  cliente: String,
});

export default mongoose.models.Venda || mongoose.model("Venda", VendaSchema);
