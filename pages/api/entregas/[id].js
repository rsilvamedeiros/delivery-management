import connectToDatabase from "../../../utils/db";
import Entrega from "../../../models/Entrega";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  console.log(`Método da requisição: ${method}`);
  console.log(`ID da entrega: ${id}`);

  try {
    await connectToDatabase();
    console.log("Conectado ao banco de dados com sucesso.");

    switch (method) {
      case "GET":
        console.log("Requisitando entrega...");
        const entrega = await Entrega.findById(id)
          .populate("motorista")
          .populate("veiculo");
        if (!entrega) {
          console.log("Entrega não encontrada.");
          return res
            .status(404)
            .json({ success: false, message: "Entrega não encontrada" });
        }
        console.log("Entrega encontrada:", entrega);
        res.status(200).json({ success: true, data: entrega });
        break;

      case "PUT":
        console.log("Atualizando entrega...");
        const updatedEntrega = await Entrega.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedEntrega) {
          console.log("Entrega não encontrada para atualização.");
          return res
            .status(404)
            .json({ success: false, message: "Entrega não encontrada" });
        }
        console.log("Entrega atualizada com sucesso:", updatedEntrega);
        res.status(200).json({ success: true, data: updatedEntrega });
        break;

      case "DELETE":
        console.log("Deletando entrega...");
        const deletedEntrega = await Entrega.findByIdAndDelete(id);
        if (!deletedEntrega) {
          console.log("Entrega não encontrada para exclusão.");
          return res
            .status(404)
            .json({ success: false, message: "Entrega não encontrada" });
        }
        console.log("Entrega deletada com sucesso:", deletedEntrega);
        res
          .status(200)
          .json({ success: true, message: "Entrega deletada com sucesso" });
        break;

      default:
        console.log(`Método ${method} não suportado.`);
        res
          .status(400)
          .json({ success: false, message: "Método não suportado" });
        break;
    }
  } catch (error) {
    console.error("Erro ao processar a requisição:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Erro interno do servidor" });
  }
}
