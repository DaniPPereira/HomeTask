# Use uma imagem base Node.js
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm ci --only=production

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta (altere se necessário)
EXPOSE 3001

# Comando para rodar o serviço
CMD ["npm", "start"]
