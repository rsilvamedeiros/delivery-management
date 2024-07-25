import { useEffect, useState } from "react";
import axios from "axios";

const FrotaPage = () => {
  const [frota, setFrota] = useState([]);

  useEffect(() => {
    const fetchFrota = async () => {
      const response = await axios.get("/api/frota");
      setFrota(response.data.data);
    };
    fetchFrota();
  }, []);

  return (
    <div>
      <h1>Frota</h1>
      <ul>
        {frota.map((veiculo) => (
          <li key={veiculo._id}>
            {veiculo.placa} - {veiculo.marca} {veiculo.modelo} ({veiculo.ano})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FrotaPage;
