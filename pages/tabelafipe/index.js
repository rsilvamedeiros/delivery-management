import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function TabelasFipe() {
  const [tabelasFipe, setTabelasFipe] = useState([]);

  useEffect(() => {
    async function fetchTabelasFipe() {
      try {
        const response = await axios.get("/api/tabelasFipe");
        setTabelasFipe(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar tabelas FIPE:", error.message);
      }
    }
    fetchTabelasFipe();
  }, []);

  return (
    <div>
      <h1>Lista de Tabelas FIPE</h1>
      <Link href="/tabelasFipe/nova" legacyBehavior>
        <a>Adicionar Nova Tabela FIPE</a>
      </Link>
      <ul>
        {tabelasFipe.map((tabela) => (
          <li key={tabela._id}>
            {tabela.nome} (R${tabela.faixaMinima} - R${tabela.faixaMaxima})
          </li>
        ))}
      </ul>
    </div>
  );
}
