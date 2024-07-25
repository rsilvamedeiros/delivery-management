import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Entregas() {
  const [entregas, setEntregas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchEntregas() {
      try {
        const response = await axios.get("/api/entregas");
        setEntregas(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar entregas:", error);
      }
    }

    fetchEntregas();
  }, []);

  const handleAddEntrega = () => {
    router.push("/entregas/nova"); // Redireciona para a página de nova entrega
  };

  return (
    <div>
      <h1>Lista de Entregas</h1>
      <button onClick={handleAddEntrega} style={{ marginBottom: "10px" }}>
        Adicionar Nova Entrega
      </button>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Status</th>
            <th>Motorista</th>
            <th>Veículo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {entregas.map((entrega) => (
            <tr key={entrega._id}>
              <td>{new Date(entrega.dataEntrega).toLocaleDateString()}</td>
              <td>{entrega.status}</td>
              <td>{entrega.motorista ? entrega.motorista.nome : "N/A"}</td>
              <td>{entrega.veiculo ? entrega.veiculo.modelo : "N/A"}</td>
              <td>
                <button onClick={() => router.push(`/entregas/${entrega._id}`)}>
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
