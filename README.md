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
- [ ] Controladores
  - [x] Autenticação
    - [x] Login
    - [x] Cadastro
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
- [x] Encriptografar senha
