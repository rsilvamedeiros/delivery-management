import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Venda() {
  const [form, setForm] = useState({
    produto: "",
    quantidade: "",
    valor: "",
    dataVenda: "",
    cliente: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchVenda() {
        try {
          const response = await axios.get(`/api/vendas/${id}`);
          const venda = response.data.data;

          // Formatar a data no formato YYYY-MM-DD
          const formattedDate = new Date(venda.dataVenda)
            .toISOString()
            .split("T")[0];

          setForm({
            produto: venda.produto,
            quantidade: venda.quantidade,
            valor: venda.valor,
            dataVenda: formattedDate,
            cliente: venda.cliente,
          });
        } catch (err) {
          setError(err.response?.data?.message || "Erro ao carregar a venda");
        } finally {
          setLoading(false);
        }
      }
      fetchVenda();
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
      await axios.put(`/api/vendas/${id}`, form);
      router.push("/vendas");
    } catch (error) {
      console.error("Erro ao atualizar a venda:", error);
      setError("Erro ao atualizar a venda. Tente novamente.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Editar Venda</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="produto"
          placeholder="Produto"
          value={form.produto}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantidade"
          placeholder="Quantidade"
          value={form.quantidade}
          onChange={handleChange}
        />
        <input
          type="number"
          name="valor"
          placeholder="Valor"
          value={form.valor}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dataVenda"
          placeholder="Data de Venda"
          value={form.dataVenda}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cliente"
          placeholder="Cliente"
          value={form.cliente}
          onChange={handleChange}
        />
        <button type="submit">Atualizar Venda</button>
      </form>
    </div>
  );
}
