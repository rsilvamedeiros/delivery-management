// pages/api/motoristas/[id].js
import connectToDatabase from "../../../utils/db";
import Motorista from "../../../models/Motorista";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const motorista = await Motorista.findById(id);
        if (!motorista) {
          return res
            .status(404)
            .json({ success: false, message: "Motorista não encontrado" });
        }
        res.status(200).json({ success: true, data: motorista });
        break;

      case "PUT":
        const updatedMotorista = await Motorista.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!updatedMotorista) {
          return res
            .status(404)
            .json({ success: false, message: "Motorista não encontrado" });
        }
        res.status(200).json({ success: true, data: updatedMotorista });
        break;

      case "DELETE":
        const deletedMotorista = await Motorista.findByIdAndDelete(id);
        if (!deletedMotorista) {
          return res
            .status(404)
            .json({ success: false, message: "Motorista não encontrado" });
        }
        res
          .status(200)
          .json({ success: true, message: "Motorista deletado com sucesso" });
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
