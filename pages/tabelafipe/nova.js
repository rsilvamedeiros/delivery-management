import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NovaTabelaFipe() {
  const [faixaMinima, setFaixaMinima] = useState("");
  const [faixaMaxima, setFaixaMaxima] = useState("");
  const [nome, setNome] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "faixaMinima") setFaixaMinima(value);
    if (name === "faixaMaxima") setFaixaMaxima(value);
    if (name === "nome") setNome(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/tabelasFipe", { faixaMinima, faixaMaxima, nome });
      router.push("/tabelasFipe");
    } catch (error) {
      console.error("Erro ao adicionar tabela FIPE:", error);
    }
  };

  return (
    <div>
      <h1>Nova Tabela FIPE</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="faixaMinima"
          placeholder="Faixa Mínima"
          value={faixaMinima}
          onChange={handleChange}
        />
        <input
          type="number"
          name="faixaMaxima"
          placeholder="Faixa Máxima"
          value={faixaMaxima}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={nome}
          onChange={handleChange}
        />
        <button type="submit">Adicionar Tabela FIPE</button>
      </form>
    </div>
  );
}
