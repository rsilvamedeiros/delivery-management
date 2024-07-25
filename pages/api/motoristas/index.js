import connectToDatabase from "../../../utils/db";
import Motorista from "../../../models/Motorista";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const motoristas = await Motorista.find({});
        res.status(200).json({ success: true, data: motoristas });
        break;

      case "POST":
        const motorista = await Motorista.create(req.body);
        res.status(201).json({ success: true, data: motorista });
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
