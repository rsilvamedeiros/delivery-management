import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NovaVenda() {
  const [form, setForm] = useState({
    produto: "",
    quantidade: "",
    valor: "",
    dataVenda: "",
    cliente: "", // Inclua o campo cliente
  });
  const [error, setError] = useState(null);
  const router = useRouter();

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
      console.log("Dados enviados para criação:", form); // Log para depuração
      await axios.post("/api/vendas", form);
      router.push("/vendas");
    } catch (error) {
      console.error("Erro ao criar a venda:", error);
      setError("Erro ao criar a venda. Tente novamente.");
    }
  };

  return (
    <div>
      <h1>Adicionar Nova Venda</h1>
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
        <button type="submit">Adicionar Venda</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
