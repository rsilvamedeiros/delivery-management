import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [form, setForm] = useState({
    modelo: "",
    marca: "",
    placa: "",
    ano: "",
    valorFIPE: "",
  });

  useEffect(() => {
    async function fetchVeiculos() {
      const response = await axios.get("/api/veiculos");
      setVeiculos(response.data.data);
    }
    fetchVeiculos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/veiculos", form);
      setForm({
        modelo: "",
        marca: "",
        placa: "",
        ano: "",
        valorFIPE: "",
      });
      // Recarregar a lista de veículos
      const response = await axios.get("/api/veiculos");
      setVeiculos(response.data.data);
    } catch (error) {
      console.error("Erro ao adicionar veículo:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Veículos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={form.modelo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={form.marca}
          onChange={handleChange}
        />
        <input
          type="text"
          name="placa"
          placeholder="Placa"
          value={form.placa}
          onChange={handleChange}
        />
        <input
          type="number"
          name="ano"
          placeholder="Ano"
          value={form.ano}
          onChange={handleChange}
        />
        <input
          type="text"
          name="valorFIPE"
          placeholder="Valor FIPE"
          value={form.valorFIPE}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Veículo</button>
      </form>
      <ul>
        {veiculos.map((veiculo) => (
          <li key={veiculo._id}>
            {veiculo.modelo} - {veiculo.placa}
          </li>
        ))}
      </ul>
    </div>
  );
}
