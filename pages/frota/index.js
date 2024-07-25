import { useEffect, useState } from "react";
import axios from "axios";

const MotoristasPage = () => {
  const [motoristas, setMotoristas] = useState([]);

  useEffect(() => {
    const fetchMotoristas = async () => {
      const response = await axios.get("/api/motoristas");
      setMotoristas(response.data.data);
    };
    fetchMotoristas();
  }, []);

  return (
    <div>
      <h1>Motoristas</h1>
      <ul>
        {motoristas.map((motorista) => (
          <li key={motorista._id}>
            {motorista.nome} - CNH: {motorista.cnh}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MotoristasPage;
