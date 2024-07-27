# Sistema de Gerenciamento de Entregas e Vendas

Este projeto é um sistema web de gerenciamento de entregas e vendas, desenvolvido utilizando Next.js e Material-UI para o frontend, e MongoDB para o backend. Ele permite a criação, leitura, atualização e exclusão (CRUD) de motoristas, veículos, marcas, valores da tabela FIPE, entregas e vendas.

## Tecnologias Utilizadas

- **Frontend:**

  - [Next.js](https://nextjs.org/)
  - [Material-UI](https://mui.com/)

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)

## Estrutura do Projeto

.
├── components
│ ├── Dashboard.js
│ └── Navbar.js
├── models
│ ├── Entrega.js
│ ├── Motorista.js
│ ├── TabelaFipe.js
│ ├── Veiculo.js
│ └── Venda.js
├── pages
│ ├── api
│ │ ├── entregas
│ │ │ ├── [id].js
│ │ │ └── index.js
│ │ ├── motoristas
│ │ │ ├── [id].js
│ │ │ └── index.js
│ │ ├── tabelafipe
│ │ │ ├── [id].js
│ │ │ └── index.js
│ │ ├── veiculos
│ │ │ ├── [id].js
│ │ │ └── index.js
│ │ └── vendas
│ │ ├── [id].js
│ │ └── index.js
│ ├── entregas
│ │ ├── index.js
│ │ └── nova.js
│ ├── motoristas
│ │ ├── index.js
│ │ └── nova.js
│ ├── tabelafipe
│ │ ├── index.js
│ │ └── nova.js
│ ├── veiculos
│ │ ├── index.js
│ │ └── nova.js
│ ├── vendas
│ │ ├── index.js
│ │ └── nova.js
│ ├── \_app.js
│ └── index.js
├── utils
│ └── db.js
└── .env.local

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

2. Instale as dependências:
npm install

3. Configure as variáveis de ambiente no arquivo .env.local:
PORT=5000
MONGO_URI=mongodb://localhost:27017/deliveryManagement

4. Inicie o servidor de desenvolvimento:
npm run dev

Endpoints
O sistema possui os seguintes endpoints para gerenciamento de dados:

Entregas:

GET /api/entregas
POST /api/entregas
GET /api/entregas/[id]
PUT /api/entregas/[id]
DELETE /api/entregas/[id]
Motoristas:

GET /api/motoristas
POST /api/motoristas
GET /api/motoristas/[id]
PUT /api/motoristas/[id]
DELETE /api/motoristas/[id]
Veículos:

GET /api/veiculos
POST /api/veiculos
GET /api/veiculos/[id]
PUT /api/veiculos/[id]
DELETE /api/veiculos/[id]
Tabelas FIPE:

GET /api/fipe
POST /api/fipe
GET /api/fipe/[id]
PUT /api/fipe/[id]
DELETE /api/fipe/[id]
Vendas:

GET /api/vendas
POST /api/vendas
GET /api/vendas/[id]
PUT /api/vendas/[id]
DELETE /api/vendas/[id]
Dashboard
A página inicial do sistema é um dashboard que contém links para cada uma das seções do sistema: entregas, motoristas, veículos, marcas, valores da tabela FIPE e vendas.

Autores
Nome do Autor 1 - GitHub
Nome do Autor 2 - GitHub
Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.


```
