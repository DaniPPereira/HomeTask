# Use uma imagem base Node.js mais recente
FROM ghcr.io/nodejs/node:18-alpine

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências em modo produção
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta correta conforme swagger
EXPOSE 3001

# Comando para rodar o serviço
CMD ["npm", "start"]
