import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NovaMarca() {
  const [nome, setNome] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setNome(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/marcas", { nome });
      router.push("/marcas");
    } catch (error) {
      console.error("Erro ao adicionar marca:", error);
    }
  };

  return (
    <div>
      <h1>Nova Marca</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome da Marca"
          value={nome}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Marca</button>
      </form>
    </div>
  );
}
