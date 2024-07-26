import mongoose from "mongoose";

const TabelaFipeSchema = new mongoose.Schema({
  faixaMinima: {
    type: Number,
    required: [true, "Faixa mínima é obrigatória"],
  },
  faixaMaxima: {
    type: Number,
    required: [true, "Faixa máxima é obrigatória"],
  },
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
});

export default mongoose.models.TabelaFipe ||
  mongoose.model("TabelaFipe", TabelaFipeSchema);
