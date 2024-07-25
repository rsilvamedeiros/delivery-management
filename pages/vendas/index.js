import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVendas() {
      try {
        const response = await axios.get("/api/vendas");
        setVendas(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao carregar as vendas");
      } finally {
        setLoading(false);
      }
    }
    fetchVendas();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Vendas</h1>
      <Link href="/vendas/nova" legacyBehavior>
        <a>Adicionar Nova Venda</a>
      </Link>
      <ul>
        {vendas.map((venda) => (
          <li key={venda._id}>
            <Link href={`/vendas/${venda._id}`} legacyBehavior>
              <a>
                {venda.produto} - {venda.quantidade} unidades
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
