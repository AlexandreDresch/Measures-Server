# Measures Backend

Este projeto é um backend para gerenciamento de medições, utilizando Express e Prisma para interação com o banco de dados.

### Tecnologias Utilizadas
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para construção de APIs.
- **Prisma**: ORM para acesso ao banco de dados.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **tsx**: Ferramenta para execução de TypeScript diretamente.

### Pré-requisitos
Antes de iniciar, verifique se você tem o Node.js e o Docker instalados na sua máquina.

### Instalação
- Clone o repositório:
```bash
git clone https://github.com/AlexandreDresch/Measures-Server.git
```
- Instale as dependências:
    - Navegue até o diretório do projeto e execute:
```bash
npm install
```

### Configuração do Ambiente
Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias com base no `.env.EXAMPLE`.

### Scripts
- **npm run build**: Compila o código TypeScript para JavaScript.
- **npm run start**: Inicia o servidor com o código JavaScript compilado.
- **npm run dev**: Inicia o servidor em modo de desenvolvimento com tsx.

### Docker
#### Construir e Iniciar o Container
- Construir a imagem Docker:
```bash
docker-compose build
```
- Iniciar os containers:
```bash
docker-compose up
```
Isso irá iniciar o backend e o banco de dados PostgreSQL definidos no arquivo docker-compose.yml.

