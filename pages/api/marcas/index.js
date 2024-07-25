import connectToDatabase from "../../../utils/db";
import Marca from "../../../models/Marca";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const marcas = await Marca.find({});
        res.status(200).json({ success: true, data: marcas });
        break;

      case "POST":
        const marca = await Marca.create(req.body);
        res.status(201).json({ success: true, data: marca });
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
