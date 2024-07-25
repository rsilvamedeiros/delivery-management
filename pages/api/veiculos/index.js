// pages/api/veiculos/index.js
import connectToDatabase from "../../../utils/db";
import Veiculo from "../../../models/Veiculo";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const veiculos = await Veiculo.find({})
          .populate("marca")
          .populate("valorFIPE");
        res.status(200).json({ success: true, data: veiculos });
        break;

      case "POST":
        const veiculo = await Veiculo.create(req.body);
        res.status(201).json({ success: true, data: veiculo });
        break;

      default:
        res
          .status(400)
          .json({ success: false, message: "Método não suportado" });
        break;
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Erro interno do servidor" });
  }
}
