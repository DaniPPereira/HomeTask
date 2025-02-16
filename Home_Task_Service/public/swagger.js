const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Home Task Service',
      version: '1.0.0',
      description: 'O home task service é uma API para gerir tarefas de casa de forma colaborativa.',
    },
    servers: [
      {
        url: 'http://localhost:3001/',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/controllers/*.js'], // Adjust this path to point to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerDocs, swaggerUi };
