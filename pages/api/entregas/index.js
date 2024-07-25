// pages/api/entregas/index.js
import connectToDatabase from "../../../utils/db";
import Entrega from "../../../models/Entrega";
import Motorista from "../../../models/Motorista";
import Veiculo from "../../../models/Veiculo";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connectToDatabase();

    switch (method) {
      case "GET":
        const entregas = await Entrega.find({})
          .populate("motorista")
          .populate("veiculo");
        res.status(200).json({ success: true, data: entregas });
        break;

      case "POST":
        const { motorista, veiculo, ...entregaData } = req.body;

        // Buscar Motorista pelo nome
        const motoristaDoc = await Motorista.findOne({ nome: motorista });
        if (!motoristaDoc) {
          return res
            .status(400)
            .json({ success: false, message: "Motorista não encontrado" });
        }

        // Buscar Veiculo pelo modelo
        const veiculoDoc = await Veiculo.findOne({ modelo: veiculo });
        if (!veiculoDoc) {
          return res
            .status(400)
            .json({ success: false, message: "Veículo não encontrado" });
        }

        // Criar nova entrega com ObjectId
        const novaEntrega = await Entrega.create({
          ...entregaData,
          motorista: motoristaDoc._id,
          veiculo: veiculoDoc._id,
        });

        res.status(201).json({ success: true, data: novaEntrega });
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
