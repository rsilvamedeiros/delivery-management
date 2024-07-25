import connectToDatabase from "../../../utils/db";
import TabelaFipe from "../../../models/TabelaFipe";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const tabelaFipe = await TabelaFipe.findById(id);
        if (!tabelaFipe) {
          return res
            .status(404)
            .json({ success: false, message: "Registro FIPE não encontrado" });
        }
        res.status(200).json({ success: true, data: tabelaFipe });
        break;

      case "PUT":
        const updatedTabelaFipe = await TabelaFipe.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }
        );
        if (!updatedTabelaFipe) {
          return res
            .status(404)
            .json({ success: false, message: "Registro FIPE não encontrado" });
        }
        res.status(200).json({ success: true, data: updatedTabelaFipe });
        break;

      case "DELETE":
        const deletedTabelaFipe = await TabelaFipe.findByIdAndDelete(id);
        if (!deletedTabelaFipe) {
          return res
            .status(404)
            .json({ success: false, message: "Registro FIPE não encontrado" });
        }
        res.status(200).json({
          success: true,
          message: "Registro FIPE deletado com sucesso",
        });
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
