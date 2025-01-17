# Sistema de Reservas de Restaurante

Uma API RESTful para gerenciar reservas de mesas em restaurantes, incluindo autenticação de usuários, controle de disponibilidade de mesas e gerenciamento de reservas. Este projeto foi desenvolvido usando Node.js, Express, MySQL, JWT e Knex.

## Funcionalidades

- Registro e login de usuários com autenticação JWT.
- Listagem de mesas disponíveis no restaurante.
- Gerenciamento de mesas (adicionar, atualizar e excluir mesas).
- Criação de reservas com validação de disponibilidade.
- Cancelamento de reservas e liberação de mesas.
- Controle de permissões: ações administrativas são restritas a administradores.

## Tecnologias Utilizadas

- **Node.js** com **Express** para o backend.
- **MySQL** como banco de dados.
- **Knex.js** para construção de queries SQL.
- **JWT (JSON Web Tokens)** para autenticação.
- **EJS (Embedded JavaScript)** para renderização de páginas.
- **Jest** e **Supertest** para testes automatizados.

## Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org) (versão 16 ou superior)
- [MySQL](https://www.mysql.com/)
- Um gerenciador de pacotes, como [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/Pedro-HenriqueQrz/sistema-reservas.git

2. Entre na pasta do projeto:
    
    cd sistema-reservas

3. Instale as depenências:

    npm install

4. Configure as váriaveis de ambiente no arquivo .env

    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_NAME=restaurante
    JWT_SECRET=sua_chave_secreta

5. Execulte as migrações para o banco de dados

    npx knex migrate:latest

6. Inicie o servidor!

    npm start


---

7. **Endpoints da API**

```markdown
## Endpoints da API

### Autenticação
- **POST** `/usuarios/registrar`: Registro de novos usuários.
- **POST** `/usuarios/login`: Login de usuários.

### Mesas
- **GET** `/mesas`: Lista todas as mesas e seus status.
- **POST** `/mesas`: Adiciona uma nova mesa (apenas administradores).

### Reservas
- **POST** `/reservas`: Cria uma nova reserva.
- **GET** `/reservas`: Lista todas as reservas do usuário autenticado.
- **PATCH** `/reservas/:id/cancelar`: Cancela uma reserva ativa.

## Testes

Para rodar os testes, use o comando:
```bash
npm test



