import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Marcas() {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    async function fetchMarcas() {
      try {
        const response = await axios.get("/api/marcas");
        setMarcas(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar marcas:", error.message);
      }
    }
    fetchMarcas();
  }, []);

  return (
    <div>
      <h1>Lista de Marcas</h1>
      <Link href="/marcas/nova" legacyBehavior>
        <a>Adicionar Nova Marca</a>
      </Link>
      <ul>
        {marcas.map((marca) => (
          <li key={marca._id}>{marca.nome}</li>
        ))}
      </ul>
    </div>
  );
}
