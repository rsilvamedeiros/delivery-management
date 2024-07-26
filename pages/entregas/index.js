import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function Entregas() {
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    async function fetchEntregas() {
      try {
        const response = await axios.get("/api/entregas");
        setEntregas(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar entregas:", error.message);
      }
    }
    fetchEntregas();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Entregas
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        href="/entregas/nova"
      >
        Adicionar Nova Entrega
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Motorista</TableCell>
              <TableCell>Veículo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entregas.map((entrega) => (
              <TableRow key={entrega._id}>
                <TableCell>
                  {new Date(entrega.dataEntrega).toLocaleDateString()}
                </TableCell>
                <TableCell>{entrega.status}</TableCell>
                <TableCell>{entrega.motorista?.nome}</TableCell>
                <TableCell>{entrega.veiculo?.modelo}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => router.push(`/entregas/${entrega._id}`)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
