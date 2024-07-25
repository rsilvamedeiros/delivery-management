import connectToDatabase from "../../../utils/db";
import Frota from "../../../models/Frota";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const frota = await Frota.find({});
        res.status(200).json({ success: true, data: frota });
        break;

      case "POST":
        const veiculo = await Frota.create(req.body);
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
