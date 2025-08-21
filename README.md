# 🛒 Ecommerce Platform

<div style="text-align: center; padding: 20px;">
    <img src="./client/public/logo.png" alt="Ecommerce Platform" style="max-width: 600px; height: auto;">
</div>

## Sobre o Projeto

Este repositório contém uma plataforma de ecommerce completa desenvolvida com tecnologias modernas. O sistema foi projetado para ser flexível e escalável, oferecendo uma base robusta e eficiente para atender a diversos tipos de negócios online.

A solução utiliza Next.js no frontend, garantindo performance otimizada e uma experiência fluida para os usuários. O backend é desenvolvido em Nest.js, proporcionando uma arquitetura modular, segura e eficiente, adequada para o gerenciamento de dados e integração com serviços externos.

A plataforma foi construída com foco em facilidade de personalização e rápida implantação, permitindo que seja adaptada às necessidades específicas de cada cliente de forma simples e eficaz.

<br/>

### Backend - Nest.js

O backend foi desenvolvido em **Nest.js**, utilizando recursos como Prisma ORM e autenticação JWT, garantindo a segurança e robustez necessárias para a aplicação de ecommerce.

### Frontend - Next.js

O frontend foi desenvolvido em **Next.js**, focado em uma interface moderna e responsiva, utilizando as melhores práticas de performance e SEO para ecommerce.

### Tecnologias Utilizadas

- **Backend**: Nest.js, TypeScript, MySQL, Prisma, Redis, JWT...
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Chakra UI...
- **Outros**: Git, Docker, Docker Compose...

---

## Como Rodar o Projeto

### Pré-Requisitos

Antes de rodar o projeto, certifique-se de que você tem as seguintes ferramentas instaladas:

- **Docker** (com Docker Compose)
- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

### Outros Comandos

Abaixo está a descrição de cada comando necessário:

- Entrar no terminal do Docker

  > docker exec -it CONTAINER_NAME bash

- Parar MySQL Local

  > sudo systemctl stop mysql

- Gerar o Cliente do Prisma:

  > npx prisma generate

- Criar e Aplicar Migrações

  > npx prisma migrate dev --name init

- Popular o Banco de Dados com Dados Iniciais (Seeder)

  > npx prisma db seed

- Rodar o Frontend em Modo Desenvolvimento

  > npm run dev

- Rodar o Servidor em Modo de Desenvolvimento (Hot Reload)

  > npm run start:dev

---

### 1. Clonar o Repositório

Primeiro, clone o repositório para o seu ambiente local:

> git clone git@github.com:seu-usuario/ecommerce-platform.git

> git clone https://github.com/seu-usuario/ecommerce-platform.git

---

### 2. Configurar o Arquivo `.env`

Copie o arquivo de exemplo e configure as variáveis no diretório raiz:

> cp env.example .env

**Configure as variáveis de ambiente no arquivo `.env`:**

**Importante:** As URLs do banco usam os nomes dos containers (`mysql`, `redis`) para comunicação interna.

---

### 3. Rodar o Projeto

#### 3.1 Com Docker

Caso você queira rodar o projeto com Docker, siga os passos abaixo:

1. **Build e execução** (criação do ambiente Docker):

   > docker-compose up --build

2. **Para parar os containers**:

   > docker-compose down

3. **Para executar em background**:

   > docker-compose up -d --build

4. **Cuidado**:

   - Certifique-se de que o **Docker** e o **Docker Compose** estão corretamente instalados.
   - Verifique se as portas **3000** (Frontend), **3001** (Backend), **3306** (Banco de Dados MySQL) e **6379** (Redis) estão disponíveis em sua máquina e não estão sendo usadas por outros processos.
   - O frontend estará disponível em `http://localhost:3000`
   - O backend estará disponível em `http://localhost:9000`

#### 3.2 Desenvolvimento com Docker

Para desenvolvimento com hot reload (recomendado para desenvolvimento):

1. **Iniciar ambiente de desenvolvimento**:

   > docker-compose -f docker-compose.dev.yml up --build

2. **Para parar os containers de desenvolvimento**:

   > docker-compose -f docker-compose.dev.yml down

3. **Para executar em background**:

   > docker-compose -f docker-compose.dev.yml up -d --build

4. **Vantagens do modo desenvolvimento**:
   - Hot reload automático
   - Volumes montados para sincronização de código
   - Logs em tempo real
   - Debug mais fácil

#### 3.3 Sem Docker

Se preferir rodar o projeto sem Docker, siga as instruções separadas para o **Frontend** e **Backend**.

**Frontend**

1. Acesse a pasta do frontend (`client`):

   > cd client

2. Instale as dependências do projeto:

   > npm install

3. Compile o projeto:

   > npm run build

4. Inicie o servidor de desenvolvimento:

   > npm run dev

5. Inicie o servidor de produção:

   > npm start

O frontend estará disponível em `http://localhost:3000`.

**Backend**

1. Acesse a pasta do backend (`server`):

   > cd server

2. Instale as dependências do backend:

   > npm install

3. Compile o projeto:

   > npm run build

4. Inicie o servidor de desenvolvimento:

   > npm run start:dev

5. Inicie o servidor de produção:

   > npm start

O backend estará disponível em `http://localhost:3001`.

---

## 🔧 Troubleshooting

### Problemas Comuns com Docker

**Erro: Porta já em uso**
```bash
# Verificar portas em uso
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001

# Parar processos que estão usando as portas
sudo kill -9 PID_DO_PROCESSO
```

**Erro: Container não inicia**
```bash
# Verificar logs dos containers
docker-compose logs

# Rebuild completo
docker-compose down
docker system prune -f
docker-compose up --build
```

**Erro: npm ci - package-lock.json não encontrado**
```bash
# Gerar package-lock.json primeiro
cd server && npm install
cd ../client && npm install

# Ou usar npm install em vez de npm ci nos Dockerfiles
# (já corrigido nos Dockerfiles atuais)
```

**Erro: Volumes não sincronizam (desenvolvimento)**
```bash
# Verificar se os volumes estão montados
docker-compose -f docker-compose.dev.yml ps

# Recriar containers
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build
```

**Limpar cache do Docker**
```bash
# Limpar imagens não utilizadas
docker image prune -f

# Limpar volumes não utilizados
docker volume prune -f

# Limpar tudo (cuidado!)
docker system prune -a -f
```

---

## Estrutura do Projeto

```
├── client/                 # Frontend Next.js
│   ├── src/
│   │   ├── app/           # App Router (Next.js 13+)
│   │   ├── components/    # Componentes React
│   │   ├── lib/          # Utilitários e configurações
│   │   └── types/        # Tipos TypeScript
│   ├── public/           # Arquivos estáticos
│   └── package.json
├── server/                # Backend Nest.js
│   ├── src/
│   │   ├── modules/      # Módulos da aplicação
│   │   ├── common/       # Decorators, guards, etc.
│   │   └── main.ts       # Arquivo principal
│   ├── prisma/           # Schema e migrações do banco
│   └── package.json
├── docker-compose.yml     # Produção
├── docker-compose.dev.yml # Desenvolvimento
└── README.md
```

---

## Funcionalidades

### 🛍️ Ecommerce
- Catálogo de produtos
- Carrinho de compras
- Sistema de checkout
- Histórico de pedidos
- Avaliações e comentários

### 👤 Usuários
- Cadastro e login
- Perfil do usuário
- Endereços de entrega
- Lista de desejos

### 🏪 Administração
- Gestão de produtos
- Gestão de pedidos
- Relatórios de vendas
- Gestão de usuários

---

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## Contato

Caso precise de mais informações ou tenha dúvidas sobre o desenvolvimento deste projeto, sinta-se à vontade para entrar em contato!

- **Email**: seu-email@exemplo.com
- **LinkedIn**: [Seu Nome](https://linkedin.com/in/seu-perfil)
- **GitHub**: [@seu-usuario](https://github.com/seu-usuario)
