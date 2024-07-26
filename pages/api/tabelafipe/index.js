import connectToDatabase from "../../../utils/db";
import TabelaFipe from "../../../models/TabelaFipe";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const tabelasFipe = await TabelaFipe.find();
        res.status(200).json({ success: true, data: tabelasFipe });
        break;

      case "POST":
        const { faixaMinima, faixaMaxima, nome } = req.body;
        const novaTabelaFipe = await TabelaFipe.create({
          faixaMinima,
          faixaMaxima,
          nome,
        });
        res.status(201).json({ success: true, data: novaTabelaFipe });
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
