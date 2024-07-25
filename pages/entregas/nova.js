// pages/entregas/novo.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NovaEntrega() {
  const [form, setForm] = useState({
    endereco: "",
    dataEntrega: "",
    status: "",
    motorista: "",
    veiculo: "",
  });
  const [motoristas, setMotoristas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchMotoristas() {
      try {
        const response = await axios.get("/api/motoristas");
        setMotoristas(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar motoristas:", error);
      }
    }

    async function fetchVeiculos() {
      try {
        const response = await axios.get("/api/veiculos");
        setVeiculos(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      }
    }

    fetchMotoristas();
    fetchVeiculos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/entregas", form);
      router.push("/entregas");
    } catch (error) {
      console.error("Erro ao criar nova entrega:", error);
    }
  };

  return (
    <div>
      <h1>Nova Entrega</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Endereço</label>
          <input
            type="text"
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data de Entrega</label>
          <input
            type="date"
            name="dataEntrega"
            value={form.dataEntrega}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status</label>
          <input
            type="text"
            name="status"
            value={form.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Motorista</label>
          <select
            name="motorista"
            value={form.motorista}
            onChange={handleChange}
          >
            <option value="">Selecione um motorista</option>
            {motoristas.map((motorista) => (
              <option key={motorista._id} value={motorista._id}>
                {motorista.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Veículo</label>
          <select name="veiculo" value={form.veiculo} onChange={handleChange}>
            <option value="">Selecione um veículo</option>
            {veiculos.map((veiculo) => (
              <option key={veiculo._id} value={veiculo._id}>
                {veiculo.modelo}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
