import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NovoMotorista() {
  const [nome, setNome] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setNome(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/motoristas", { nome });
      router.push("/motoristas");
    } catch (error) {
      console.error("Erro ao adicionar motorista:", error);
    }
  };

  return (
    <div>
      <h1>Cadastro de Motorista</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={nome}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Motorista</button>
      </form>
    </div>
  );
}
