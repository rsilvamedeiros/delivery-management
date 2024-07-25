import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Entregas() {
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    async function fetchEntregas() {
      const response = await axios.get("/api/entregas");
      setEntregas(response.data.data);
    }
    fetchEntregas();
  }, []);

  return (
    <div>
      <h1>Lista de Entregas</h1>
      <Link href="/entregas/nova" legacyBehavior>
        <a>Adicionar Nova Entrega</a>
      </Link>
      <ul>
        {entregas.map((entrega) => (
          <li key={entrega._id}>
            <Link href={`/entregas/${entrega._id}`} legacyBehavior>
              <a>
                {entrega.endereco} - {entrega.status}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
