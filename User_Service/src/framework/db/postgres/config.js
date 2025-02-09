const { Sequelize } = require('sequelize');//
require('dotenv').config();

const db = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados
  
  process.env.DB_USER, // Usuário do banco
  process.env.DB_PASSWORD, // Senha do banco
  {
    host: process.env.DB_HOST, // Host do banco
    port: process.env.DB_PORT, // Porta do banco
    dialect: 'postgres', // Dialeto usado (Postgres)
    logging: false, // Desabilitar logs do Sequelize
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
console.log(process.env.DB_NAME);
console.log(process.env.DB_USER,);
console.log(process.env.DB_PASSWORD);
// Verifique se a conexão foi estabelecida com sucesso
(async () => {
  try {
    await db.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
})();

module.exports = db; // Exporte a instância para que outros arquivos possam usá-la
