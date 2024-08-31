# Usar uma imagem base do Node.js
FROM node:20.13.1

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar apenas os arquivos de configuração do npm
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar as migrações do Prisma
COPY prisma ./prisma/

# Copiar o restante do código da aplicação
COPY . .

# Gerar os artefatos do Prisma
RUN npx prisma generate

# Definir o comando que inicia a aplicação
CMD ["npm", "run", "dev"]
