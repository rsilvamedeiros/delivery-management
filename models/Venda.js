import mongoose from "mongoose";

const VendaSchema = new mongoose.Schema({
  produto: {
    type: String,
    required: [true, "Produto é obrigatório"],
  },
  quantidade: {
    type: Number,
    required: [true, "Quantidade é obrigatória"],
  },
  valor: {
    type: Number,
    required: [true, "Valor é obrigatório"],
  },
  dataVenda: {
    type: Date,
    required: [true, "Data da venda é obrigatória"],
  },
});

export default mongoose.models.Venda || mongoose.model("Venda", VendaSchema);
