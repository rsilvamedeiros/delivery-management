import { useEffect, useState } from "react";
import axios from "axios";

const MarcasPage = () => {
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const fetchMarcas = async () => {
      const response = await axios.get("/api/marcas");
      setMarcas(response.data.data);
    };
    fetchMarcas();
  }, []);

  return (
    <div>
      <h1>Marcas</h1>
      <ul>
        {marcas.map((marca) => (
          <li key={marca._id}>{marca.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default MarcasPage;
