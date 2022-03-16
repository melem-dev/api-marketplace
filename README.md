# api-marketplace

API com funções básicas de uma loja, como cadastro de produtos, cadastro de cliente e cadastro de funcionários.

### Lista de tarefas e atualizações

- [x] Instalar dependências.
  - [x] Express
  - [x] Cors
  - [x] Mongoose
  - [x] Dotenv
  - [x] jsonwebtoken
  - [x] Bcrypt
- [x] Inicializar servidor express
- [x] Conexão com o Mongodb cloud
- [x] Modelos
  - [x] Produtos
    - Title
    - Slug
    - Price
  - [x] Usuários
    - Username
    - Password
    - Email
    - Type (Cliente / Funcionário)
  - [x] Clientes
    - userID (objectID)
    - Purchases
  - [x] Funcionários
    - userID (ObjectID)
  - [x] Vendas
    - Client (ObjectID)
    - Items
    - Total
    - Status
- [x] Controladores
  - [x] Autenticação
    - [x] Login
    - [x] Cadastro
  - [x] Produtos
    - [x] Cadastro
    - [x] Listar um
    - [x] Listar todos
    - [x] Editar
    - [x] Excluir
  - [x] Ordens
    - [x] Compra
    - [x] Status
    - [x] Listar
- [ ] Middlewares
  - [x] Autenticado
  - [ ] Cliente?
  - [ ] Funcionario?
- [x] Encriptografar senha
- [x] Rotas
  - [x] GET /login
  - [x] POST /register
  - [x] GET /product
  - [x] GET /product/:id
  - [x] POST /product
  - [x] PUT /product/:id
  - [x] DELETE /product/:id
  - [x] GET /order
  - [x] GET /order/:id
  - [x] POST /order
- Fix:
  - [x] Produto incorreto ao buscar ordens