import { useEffect, useState } from "react";
import axios from "axios";

const TabelaFipePage = () => {
  const [tabelaFipe, setTabelaFipe] = useState([]);

  useEffect(() => {
    const fetchTabelaFipe = async () => {
      const response = await axios.get("/api/tabelafipe");
      setTabelaFipe(response.data.data);
    };
    fetchTabelaFipe();
  }, []);

  return (
    <div>
      <h1>Tabela FIPE</h1>
      <ul>
        {tabelaFipe.map((registro) => (
          <li key={registro._id}>
            {registro.marca} {registro.modelo} ({registro.ano}) - R${" "}
            {registro.valor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabelaFipePage;
