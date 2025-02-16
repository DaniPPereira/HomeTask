# Usar PostgreSQL 16 Alpine para menor tamanho de imagem
FROM postgres:16-alpine

# Definir variáveis de ambiente para o PostgreSQL
ENV POSTGRES_USER=grupo6_admin
ENV POSTGRES_PASSWORD=grupo6
ENV POSTGRES_DB=home_task_db

# Copiar o script de inicialização para dentro do contêiner
COPY ./initial_schema.sql /docker-entrypoint-initdb.d/

# Expor a porta padrão do PostgreSQL
EXPOSE 5432
