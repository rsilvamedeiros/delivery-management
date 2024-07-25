import connectToDatabase from "../../../utils/db";
import Entrega from "../../../models/Entrega";

export default async function handler(req, res) {
  const { method } = req;
  console.log(`Método da requisição: ${method}`);

  try {
    await connectToDatabase();
    console.log("Conectado ao banco de dados com sucesso.");

    switch (method) {
      case "GET":
        console.log("Requisitando todas as entregas...");
        const entregas = await Entrega.find({})
          .populate("motorista")
          .populate("veiculo");
        console.log(`Número de entregas encontradas: ${entregas.length}`);
        res.status(200).json({ success: true, data: entregas });
        break;

      case "POST":
        console.log("Recebendo dados para criar uma nova entrega...");
        const entrega = await Entrega.create(req.body);
        console.log("Nova entrega criada com sucesso:", entrega);
        res.status(201).json({ success: true, data: entrega });
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
