import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NovoVeiculo() {
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [valorFIPE, setValorFIPE] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [fipe, setFipe] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const marcasResponse = await axios.get("/api/marcas");
        setMarcas(marcasResponse.data.data);

        const fipeResponse = await axios.get("/api/fipe");
        setFipe(fipeResponse.data.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error.message);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "modelo") setModelo(value);
    if (name === "marca") setMarca(value);
    if (name === "placa") setPlaca(value);
    if (name === "ano") setAno(value);
    if (name === "valorFIPE") setValorFIPE(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/veiculos", {
        modelo,
        marca,
        placa,
        ano,
        valorFIPE,
      });
      router.push("/veiculos");
    } catch (error) {
      console.error("Erro ao adicionar veículo:", error);
    }
  };

  return (
    <div>
      <h1>Novo Veículo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={modelo}
          onChange={handleChange}
        />
        <select name="marca" value={marca} onChange={handleChange}>
          <option value="">Selecione a Marca</option>
          {marcas.map((marca) => (
            <option key={marca._id} value={marca._id}>
              {marca.nome}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="placa"
          placeholder="Placa"
          value={placa}
          onChange={handleChange}
        />
        <input
          type="number"
          name="ano"
          placeholder="Ano"
          value={ano}
          onChange={handleChange}
        />
        <select name="valorFIPE" value={valorFIPE} onChange={handleChange}>
          <option value="">Selecione a Tabela FIPE</option>
          {fipe.map((tabela) => (
            <option key={tabela._id} value={tabela._id}>
              {tabela.nome} (R${tabela.faixaMinima} - R${tabela.faixaMaxima})
            </option>
          ))}
        </select>
        <button type="submit">Adicionar Veículo</button>
      </form>
    </div>
  );
}
