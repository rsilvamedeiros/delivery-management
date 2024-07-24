import connectToDatabase from "../../../utils/db";
import Entrega from "../../../models/Entrega";

export default async function handler(req, res) {
  const { method } = req;
  await connectToDatabase();

  switch (method) {
    case "GET":
      const entregas = await Entrega.find({});
      res.status(200).json({ success: true, data: entregas });
      break;
    case "POST":
      try {
        const entrega = await Entrega.create(req.body);
        res.status(201).json({ success: true, data: entrega });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
