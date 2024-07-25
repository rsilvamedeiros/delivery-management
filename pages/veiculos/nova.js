import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NovoVeiculo() {
  const [modelo, setModelo] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setModelo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/veiculos", { modelo });
      router.push("/veiculos");
    } catch (error) {
      console.error("Erro ao adicionar veículo:", error);
    }
  };

  return (
    <div>
      <h1>Cadastro de Veículo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={modelo}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Veículo</button>
      </form>
    </div>
  );
}
