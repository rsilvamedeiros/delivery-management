import connectToDatabase from "../../../utils/db";
import Entrega from "../../../models/Entrega";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const entrega = await Entrega.findById(id).populate(
          "motorista veiculo"
        );
        if (!entrega) {
          return res
            .status(404)
            .json({ success: false, message: "Entrega não encontrada" });
        }
        res.status(200).json({ success: true, data: entrega });
        break;
      case "PUT":
        const updatedEntrega = await Entrega.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        }).populate("motorista veiculo");
        if (!updatedEntrega) {
          return res
            .status(404)
            .json({ success: false, message: "Entrega não encontrada" });
        }
        res.status(200).json({ success: true, data: updatedEntrega });
        break;
      case "DELETE":
        const deletedEntrega = await Entrega.findByIdAndDelete(id);
        if (!deletedEntrega) {
          return res
            .status(404)
            .json({ success: false, message: "Entrega não encontrada" });
        }
        res
          .status(200)
          .json({ success: true, message: "Entrega deletada com sucesso" });
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
