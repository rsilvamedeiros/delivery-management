import connectToDatabase from "../../../utils/db";
import Marca from "../../../models/Marca";

export default async function handler(req, res) {
  const { method } = req;

  console.log(`Método da requisição: ${method}`);

  try {
    await connectToDatabase();
    console.log("Conectado ao banco de dados com sucesso.");

    switch (method) {
      case "GET":
        console.log("Buscando marcas...");
        const marcas = await Marca.find();
        res.status(200).json({ success: true, data: marcas });
        break;

      case "POST":
        console.log("Recebendo dados para criar uma nova marca...");
        const { nome } = req.body;

        const novaMarca = await Marca.create({ nome });
        res.status(201).json({ success: true, data: novaMarca });
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
