import connectToDatabase from "../../../utils/db";
import Venda from "../../../models/Venda";

export default async function handler(req, res) {
  const { method } = req;
  await connectToDatabase();

  switch (method) {
    case "GET":
      const vendas = await Venda.find({});
      res.status(200).json({ success: true, data: vendas });
      break;
    case "POST":
      try {
        const venda = await Venda.create(req.body);
        res.status(201).json({ success: true, data: venda });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
