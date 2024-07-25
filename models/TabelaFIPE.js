import mongoose from "mongoose";

const TabelaFipeSchema = new mongoose.Schema({
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
  valor: {
    type: Number,
    required: [true, "Valor do veículo é obrigatório"],
  },
});

export default mongoose.models.TabelaFipe ||
  mongoose.model("TabelaFipe", TabelaFipeSchema);
