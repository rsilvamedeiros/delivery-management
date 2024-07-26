import connectToDatabase from "../../../utils/db";
import Veiculo from "../../../models/Veiculo";

export default async function handler(req, res) {
  const { method } = req;

  console.log(`Método da requisição: ${method}`);

  try {
    await connectToDatabase();
    console.log("Conectado ao banco de dados com sucesso.");

    switch (method) {
      case "GET":
        console.log("Buscando veículos...");
        const veiculos = await Veiculo.find()
          .populate("marca", "nome") // Popular a marca para mostrar o nome
          .populate("valorFIPE", "nome"); // Popular a tabela FIPE para mostrar o nome
        res.status(200).json({ success: true, data: veiculos });
        break;

      case "POST":
        console.log("Recebendo dados para criar um novo veículo...");
        const { modelo, marca, placa, ano, valorFIPE } = req.body;

        const novoVeiculo = await Veiculo.create({
          modelo,
          marca,
          placa,
          ano,
          valorFIPE,
        });

        res.status(201).json({ success: true, data: novoVeiculo });
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
