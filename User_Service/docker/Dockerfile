FROM postgres:16-alpine

# Definir variáveis de ambiente para o PostgreSQL
ENV POSTGRES_USER=Daniel
ENV POSTGRES_PASSWORD=9394
ENV POSTGRES_DB=user_auth_db

# Copiar o script de inicialização para dentro do contêiner
COPY db/initial_schema.sql /docker-entrypoint-initdb.d/

# Expor a porta 5432 para conexões externas
EXPOSE 5435