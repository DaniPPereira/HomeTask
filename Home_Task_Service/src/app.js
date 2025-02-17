'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { db, initializeModels } = require('./framework/db/postgres/models');
const { swaggerDocs, swaggerUi } = require('../public/swagger');

// Swagger UI for API documentation

(async () => {
    try {
        await db.authenticate();
        console.log('✅ Database connection established successfully!');

        await initializeModels();
        console.log('✅ Models initialized and synchronized successfully!');

        const app = express();

        app.use(express.json());

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        // Importar controladores
        const taskRouter = require('./controllers/TaskController');
        const taskCategoryRouter = require('./controllers/TaskCategoryController');
        const taskParticipantsRouter = require('./controllers/TaskParticipantsController');
        const homeRouter = require('./controllers/HomeController');
        const zipCodeRouter = require('./controllers/ZipCodeController');
        const residentsRouter = require('./controllers/ResidentsController');

        // Definir rotas
        app.use('/tasks', taskRouter);
        app.use('/task-categories', taskCategoryRouter);
        app.use('/task-participants', taskParticipantsRouter);
        app.use('/homes', homeRouter);
        app.use('/zipcodes', zipCodeRouter);
        app.use('/residents', residentsRouter);

        // Health check endpoint
        app.get('/health', (req, res) => {
            res.status(200).json({ status: 'ok', service: 'home-task-service' });
        });

        // Middleware para tratamento de erros
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(err.status || 500).send({
                error: {
                    message: err.message || 'Internal Server Error',
                },
            });
        });

        // Iniciar o servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 API running at http://localhost:${PORT}`);
        });

        module.exports = app;
    } catch (error) {
        console.error('❌ Error during initialization:', error);
        process.exit(1); 
    }
})();
