import connectToDatabase from "../../../utils/db";
import Venda from "../../../models/Venda";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  try {
    await connectToDatabase();
    console.log("Conectado ao banco de dados com sucesso.");

    switch (method) {
      case "GET":
        console.log(`Buscando venda com ID ${id}...`);
        const venda = await Venda.findById(id);
        if (!venda) {
          return res
            .status(404)
            .json({ success: false, message: "Venda não encontrada" });
        }
        res.status(200).json({ success: true, data: venda });
        break;

      case "PUT":
        console.log(`Atualizando venda com ID ${id}...`);
        console.log("Dados recebidos para atualização:", req.body); // Log para depuração

        const updatedVenda = await Venda.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedVenda) {
          return res
            .status(404)
            .json({ success: false, message: "Venda não encontrada" });
        }
        res.status(200).json({ success: true, data: updatedVenda });
        break;

      case "DELETE":
        const deletedVenda = await Venda.findByIdAndDelete(id);
        if (!deletedVenda) {
          return res
            .status(404)
            .json({ success: false, message: "Venda não encontrada" });
        }
        res
          .status(200)
          .json({ success: true, message: "Venda deletada com sucesso" });
        break;

      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Método ${method} não permitido`);
        // res
        //   .status(400)
        //   .json({ success: false, message: "Método não suportado" });
        break;
    }
  } catch (error) {
    console.error("Erro ao processar a requisição:", error.message);

    res
      .status(500)
      .json({ success: false, message: "Erro interno do servidor" });
  }
}
