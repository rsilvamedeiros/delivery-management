import connectToDatabase from "../../../utils/db";
import Frota from "../../../models/Frota";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const veiculo = await Frota.findById(id);
        if (!veiculo) {
          return res
            .status(404)
            .json({ success: false, message: "Veículo não encontrado" });
        }
        res.status(200).json({ success: true, data: veiculo });
        break;

      case "PUT":
        const updatedVeiculo = await Frota.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedVeiculo) {
          return res
            .status(404)
            .json({ success: false, message: "Veículo não encontrado" });
        }
        res.status(200).json({ success: true, data: updatedVeiculo });
        break;

      case "DELETE":
        const deletedVeiculo = await Frota.findByIdAndDelete(id);
        if (!deletedVeiculo) {
          return res
            .status(404)
            .json({ success: false, message: "Veículo não encontrado" });
        }
        res
          .status(200)
          .json({ success: true, message: "Veículo deletado com sucesso" });
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
