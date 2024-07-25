import connectToDatabase from "../../../utils/db";
import Marca from "../../../models/Marca";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const marca = await Marca.findById(id);
        if (!marca) {
          return res
            .status(404)
            .json({ success: false, message: "Marca não encontrada" });
        }
        res.status(200).json({ success: true, data: marca });
        break;

      case "PUT":
        const updatedMarca = await Marca.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedMarca) {
          return res
            .status(404)
            .json({ success: false, message: "Marca não encontrada" });
        }
        res.status(200).json({ success: true, data: updatedMarca });
        break;

      case "DELETE":
        const deletedMarca = await Marca.findByIdAndDelete(id);
        if (!deletedMarca) {
          return res
            .status(404)
            .json({ success: false, message: "Marca não encontrada" });
        }
        res
          .status(200)
          .json({ success: true, message: "Marca deletada com sucesso" });
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
