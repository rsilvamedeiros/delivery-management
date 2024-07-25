import connectToDatabase from "../../../utils/db";
import TabelaFipe from "../../../models/TabelaFipe";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const tabelaFipe = await TabelaFipe.find({});
        res.status(200).json({ success: true, data: tabelaFipe });
        break;

      case "POST":
        const novoRegistro = await TabelaFipe.create(req.body);
        res.status(201).json({ success: true, data: novoRegistro });
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
