import { Container, Grid, Typography, Button, Paper } from "@mui/material";
import Link from "next/link";

export default function Dashboard() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
            <Typography variant="h5">Entregas</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/entregas"
              fullWidth
              style={{ marginTop: 10 }}
            >
              Ver Entregas
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
            <Typography variant="h5">Veículos</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/veiculos"
              fullWidth
              style={{ marginTop: 10 }}
            >
              Ver Veículos
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
            <Typography variant="h5">Motoristas</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/motoristas"
              fullWidth
              style={{ marginTop: 10 }}
            >
              Ver Motoristas
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
            <Typography variant="h5">Marcas</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/marcas"
              fullWidth
              style={{ marginTop: 10 }}
            >
              Ver Marcas
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
            <Typography variant="h5">Tabela FIPE</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/fipe"
              fullWidth
              style={{ marginTop: 10 }}
            >
              Ver Tabela FIPE
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
            <Typography variant="h5">Vendas</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/vendas"
              fullWidth
              style={{ marginTop: 10 }}
            >
              Ver Vendas
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
