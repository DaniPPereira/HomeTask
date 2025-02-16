FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta correta
EXPOSE 3002

# Comando para rodar o serviço
CMD ["npm", "start"] 