import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    async function fetchVeiculos() {
      try {
        const response = await axios.get("/api/veiculos");
        setVeiculos(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error.message);
      }
    }
    fetchVeiculos();
  }, []);

  return (
    <div>
      <h1>Lista de Veículos</h1>
      <Link href="/veiculos/nova" legacyBehavior>
        <a>Adicionar Novo Veículo</a>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Placa</th>
            <th>Ano</th>
            <th>Valor FIPE</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo._id}>
              <td>{veiculo.modelo}</td>
              <td>{veiculo.marca ? veiculo.marca.nome : "Desconhecida"}</td>
              <td>{veiculo.placa}</td>
              <td>{veiculo.ano}</td>
              <td>
                {veiculo.valorFIPE ? veiculo.valorFIPE.nome : "Desconhecido"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
