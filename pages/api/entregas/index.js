import connectToDatabase from "../../../utils/db";
import Entrega from "../../../models/Entrega";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const entregas = await Entrega.find().populate("motorista veiculo");
        res.status(200).json({ success: true, data: entregas });
        break;
      case "POST":
        const { dataEntrega, status, motorista, veiculo } = req.body;
        const novaEntrega = await Entrega.create({
          dataEntrega,
          status,
          motorista,
          veiculo,
        });
        res.status(201).json({ success: true, data: novaEntrega });
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
