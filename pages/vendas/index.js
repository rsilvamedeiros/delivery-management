import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    async function fetchVendas() {
      const response = await axios.get("/api/vendas");
      setVendas(response.data.data);
    }
    fetchVendas();
  }, []);

  return (
    <div>
      <h1>Lista de Vendas</h1>
      <Link href="/vendas/nova">
        <a>Adicionar Nova Venda</a>
      </Link>
      <ul>
        {vendas.map((venda) => (
          <li key={venda._id}>
            <Link href={`/vendas/${venda._id}`}>
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
