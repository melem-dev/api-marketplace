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
- [ ] Modelos
  - [ ] Produtos
    - Title
    - Slug
    - Price
  - [ ] Usuários
    - Username
    - Password
    - Email
    - Type (Cliente / Funcionário)
  - [ ] Clientes
    - userID (objectID)
    - Purchases
  - [ ] Funcionários
    - userID (ObjectID)
  - [ ] Vendas
    - Client (ObjectID)
    - Items
    - Total
    - Status
- [ ] Controladores
  - [ ] Autenticação
    - [ ] Login
    - [ ] Cadastro
  - [ ] Produtos
    - [ ] Cadastro
    - [ ] Listar um
    - [ ] Listar todos
    - [ ] Editar
    - [ ] Excluir
  - [ ] Ordens
    - [ ] Compra
    - [ ] Status
- [ ] Middlewares
  - [ ] Cliente?
  - [ ] Funcionario?
