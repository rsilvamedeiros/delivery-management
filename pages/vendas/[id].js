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

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchVenda() {
        const response = await axios.get(`/api/vendas/${id}`);
        setForm(response.data.data);
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
      console.error(error);
    }
  };

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
