import mongoose from "mongoose";

const MarcaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome da marca é obrigatório"],
    unique: true,
  },
});

export default mongoose.models.Marca || mongoose.model("Marca", MarcaSchema);
