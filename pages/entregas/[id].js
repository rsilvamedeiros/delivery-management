import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Entrega() {
  const [form, setForm] = useState({
    endereco: "",
    dataEntrega: "",
    status: "",
    motorista: "",
    veiculo: "",
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchEntrega() {
        try {
          const response = await axios.get(`/api/entregas/${id}`);
          const entrega = response.data.data;

          // Formatar a data no formato YYYY-MM-DD
          const formattedDate = new Date(entrega.dataEntrega)
            .toISOString()
            .split("T")[0];

          setForm({
            endereco: entrega.endereco,
            dataEntrega: formattedDate,
            status: entrega.status,
            motorista: entrega.motorista,
            veiculo: entrega.veiculo,
          });
        } catch (error) {
          console.error("Erro ao buscar entrega:", error);
        }
      }
      fetchEntrega();
    }
  }, [id]);

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
      await axios.put(`/api/entregas/${id}`, form);
      router.push("/entregas");
    } catch (error) {
      console.error("Erro ao atualizar entrega:", error);
    }
  };

  return (
    <div>
      <h1>Editar Entrega</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={form.endereco}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dataEntrega"
          placeholder="Data de Entrega"
          value={form.dataEntrega}
          onChange={handleChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
        />
        <input
          type="text"
          name="motorista"
          placeholder="Motorista"
          value={form.motorista}
          onChange={handleChange}
        />
        <input
          type="text"
          name="veiculo"
          placeholder="Veículo"
          value={form.veiculo}
          onChange={handleChange}
        />
        <button type="submit">Atualizar Entrega</button>
      </form>
    </div>
  );
}
