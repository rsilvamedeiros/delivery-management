import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

export default function NovaEntrega() {
  const [dataEntrega, setDataEntrega] = useState("");
  const [status, setStatus] = useState("");
  const [motorista, setMotorista] = useState("");
  const [veiculo, setVeiculo] = useState("");
  const [motoristas, setMotoristas] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchMotoristasVeiculos() {
      try {
        const [motoristasResponse, veiculosResponse] = await Promise.all([
          axios.get("/api/motoristas"),
          axios.get("/api/veiculos"),
        ]);
        setMotoristas(motoristasResponse.data.data);
        setVeiculos(veiculosResponse.data.data);
      } catch (error) {
        console.error("Erro ao buscar motoristas e veículos:", error.message);
      }
    }
    fetchMotoristasVeiculos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/entregas", {
        dataEntrega,
        status,
        motorista,
        veiculo,
      });
      router.push("/entregas");
    } catch (error) {
      console.error("Erro ao adicionar entrega:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Nova Entrega
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          type="date"
          label="Data da Entrega"
          value={dataEntrega}
          onChange={(e) => setDataEntrega(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <FormControl>
          <InputLabel id="motorista-label">Motorista</InputLabel>
          <Select
            labelId="motorista-label"
            value={motorista}
            onChange={(e) => setMotorista(e.target.value)}
            required
          >
            {motoristas.map((motorista) => (
              <MenuItem key={motorista._id} value={motorista._id}>
                {motorista.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="veiculo-label">Veículo</InputLabel>
          <Select
            labelId="veiculo-label"
            value={veiculo}
            onChange={(e) => setVeiculo(e.target.value)}
            required
          >
            {veiculos.map((veiculo) => (
              <MenuItem key={veiculo._id} value={veiculo._id}>
                {veiculo.modelo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Adicionar Entrega
        </Button>
      </Box>
    </Container>
  );
}
