import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NovaEntrega() {
  const [form, setForm] = useState({
    endereco: "",
    dataEntrega: "",
    status: "",
    motorista: "",
    veiculo: "",
  });

  const router = useRouter();

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
      await axios.post("/api/entregas", form);
      router.push("/entregas");
    } catch (error) {
      console.error("Erro ao adicionar entrega:", error);
    }
  };

  return (
    <div>
      <h1>Nova Entrega</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dataEntrega"
          placeholder="Data de Entrega"
          value={form.dataEntrega}
          onChange={handleChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
        />
        <input
          type="text"
          name="motorista"
          placeholder="Motorista"
          value={form.motorista}
          onChange={handleChange}
        />
        <input
          type="text"
          name="veiculo"
          placeholder="Veículo"
          value={form.veiculo}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Entrega</button>
      </form>
    </div>
  );
}
