FROM node:18.19-alpine3.18

WORKDIR /usr/src/app

# Copiar package.json e package-lock.json primeiro
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código fonte
COPY src/ ./src/

# Expor a porta
EXPOSE 3002

# Comando para iniciar o serviço
CMD ["node", "src/app.js"] 