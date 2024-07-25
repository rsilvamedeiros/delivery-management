import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Motoristas() {
  const [motoristas, setMotoristas] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    cnh: "",
    telefone: "",
    endereco: "",
  });

  useEffect(() => {
    async function fetchMotoristas() {
      const response = await axios.get("/api/motoristas");
      setMotoristas(response.data.data);
    }
    fetchMotoristas();
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
      await axios.post("/api/motoristas", form);
      setForm({
        nome: "",
        cnh: "",
        telefone: "",
        endereco: "",
      });
      // Recarregar a lista de motoristas
      const response = await axios.get("/api/motoristas");
      setMotoristas(response.data.data);
    } catch (error) {
      console.error("Erro ao adicionar motorista:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Motoristas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cnh"
          placeholder="CNH"
          value={form.cnh}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Motorista</button>
      </form>
      <ul>
        {motoristas.map((motorista) => (
          <li key={motorista._id}>
            {motorista.nome} - {motorista.cnh}
          </li>
        ))}
      </ul>
    </div>
  );
}
