import connectToDatabase from "../../../utils/db";
import Venda from "../../../models/Venda";

export default async function handler(req, res) {
  const { method } = req;
  console.log(`Método da requisição: ${method}`);

  try {
    await connectToDatabase();
    console.log("Conectado ao banco de dados com sucesso.");

    switch (method) {
      case "GET":
        console.log("Requisitando todas as vendas...");
        const vendas = await Venda.find({});
        console.log(`Número de vendas encontradas: ${vendas.length}`);
        res.status(200).json({ success: true, data: vendas });
        break;

      case "POST":
        console.log("Recebendo dados para criar uma nova venda...");
        console.log("Dados recebidos:", req.body); // Log para depuração
        const venda = await Venda.create(req.body);
        console.log("Nova venda criada com sucesso:", venda);
        res.status(201).json({ success: true, data: venda });
        break;

      default:
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
