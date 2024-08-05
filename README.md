<h1 align="center" style="font-weight: bold;">MicroArchAPI</h1>

<p align="center">
    <b>MicroArchAPI é uma API RESTful que demonstra o uso de microserviços e ferramentas modernas! 🛠️📡</b>
</p>
<p align="center">
Neste projeto, fui responsável por desenvolver um back-end utilizando NestJS e TypeScript. A API RESTful foi projetada para ser escalável e modular, facilitando a integração com diferentes serviços front-end. Além do desenvolvimento da API, o projeto focou na criação de uma infraestrutura utilizando diversos serviços da AWS: EC2, SES, S3, CloudFront e RDS. Também apliquei conceitos de microservices utilizando NestJS para desenvolver um dos serviços da API.
</p>

<details>
<summary><h2 id="architecture">🏗️ Arquitetura</h2></summary><br>
<img src="https://github.com/user-attachments/assets/3426b6c5-40c4-4268-aa42-6256f81033d3" alt="Architecture diagram">
</details>

<details>
  <summary><h2>🗄️ Descrição do banco de dados</h2></summary><br>

  <img src="https://github.com/user-attachments/assets/b30dbe67-ec50-430d-94c2-c52fa3af323c" alt="Modelo database" width="600"/>

  Nesse modelo, temos as seguintes tabelas:
- `users`: Representa os usuários do sistema.
- `cats`: Representa os gatos, com um relacionamento `n:1` ("muitos para um") com a tabela `users`
</details>

<details>
  <summary><h2>💻 Principais tecnologias</h2></summary><br>

- NestJS
- TypeORM
- AWS RDS
- RabbitMQ
- Swagger
- AWS SDK
- Docker
- Docker-Compose

 <b> Para desenvolver os testes: </b>
 
- Jest
- Supertest
</details>


<details>
  <summary><h2>📍 API Endpoints</h2></summary><br>
Aqui estão os principais endpoints da API, descrevendo o que cada um faz e os detalhes relevantes.

| Rotas                     | Descrição                                           |
|---------------------------|-----------------------------------------------------|
| `GET /cats`              | Retorna todos os gatos cadastrados.         |
| `GET /cats/{id}`         | Retorna um gato específico pelo ID.           |
| `POST /cats`       | Cria um novo gato.            |
| `PUT /cats/{id}` | Atualiza um gato específico pelo ID. |
| `DELETE /cats/{id}` | Deleta um gato específico pelo ID. |
| `POST /cats/{catId}/users/{userId}` | Associa um usuário a um gato específico. |
| `POST /users`         | Cria uma novo usuário no sistema.             |
| `POST /auth/login`         | Realiza o login de um usuário e retorna um token JWT.|


</details>



<details>
  <summary><h2>🗄️ 🚀 Getting started</h2></summary><br>
<h3>Cloning</h3>

Após usar o comando acessar a pasta do projeto para fazer os próximos passos.

```bash
git clone your-project-url-in-github
```

- Utilizando o comando para executar os containers docker através do docker compose

```bash
docker-compose -up
```
  
- Para verificar se o back-end está on, acesse http://localhost:8080/actuator/health.
</details>


