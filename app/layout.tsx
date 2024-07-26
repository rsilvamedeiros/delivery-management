import { ReactNode } from "react";
import { Container } from "@mui/material";
import { Roboto } from "next/font/google";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

// Ajuste para usar a propriedade correta `weight`
const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["400", "700"], // Use a propriedade `weight` para especificar pesos válidos
});

export const metadata = {
  title: "Sistema de Gerenciamento",
  description: "Sistema de Gerenciamento com Next.js e Material-UI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Sistema de Gerenciamento
            </Typography>
            <Button color="inherit" component={Link} href="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} href="/entregas">
              Entregas
            </Button>
            <Button color="inherit" component={Link} href="/veiculos">
              Veículos
            </Button>
            <Button color="inherit" component={Link} href="/motoristas">
              Motoristas
            </Button>
            <Button color="inherit" component={Link} href="/marcas">
              Marcas
            </Button>
            <Button color="inherit" component={Link} href="/tabelafipe">
              Tabela FIPE
            </Button>
            <Button color="inherit" component={Link} href="/vendas">
              Vendas
            </Button>
          </Toolbar>
        </AppBar>
        <Container style={{ padding: '20px' }}>
          {children}
        </Container>
      </body>
    </html>
  );
}
