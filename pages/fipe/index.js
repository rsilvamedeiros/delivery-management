import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Fipe() {
  const [fipe, setFipe] = useState([]);

  useEffect(() => {
    async function fetchFipe() {
      try {
        const response = await axios.get("/api/fipe");
        setFipe(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar tabelas FIPE:", error.message);
      }
    }
    fetchFipe();
  }, []);

  return (
    <div>
      <h1>Lista de Tabelas FIPE</h1>
      <Link href="/fipe/nova" legacyBehavior>
        <a>Adicionar Nova Tabela FIPE</a>
      </Link>
      <ul>
        {fipe.map((tabela) => (
          <li key={tabela._id}>
            {tabela.nome} (R${tabela.faixaMinima} - R${tabela.faixaMaxima})
          </li>
        ))}
      </ul>
    </div>
  );
}
