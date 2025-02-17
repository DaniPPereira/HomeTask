// express, a web framework for Node.js
const express = require('express');
// For interacting with the file system
const path = require('path');
// For parsing the body of incoming requests
const bodyParser = require('body-parser');
// For connecting to the database
const sequelize = require('./framework/db/postgres/config');
// Swagger UI for API documentation
//const { swaggerDocs, swaggerUi } = require('../public/swagger');
// Swagger API definition
//const swaggerDocument = require('../public/swagger.json');
// Load environment variables from .env

const cors = require('cors');
const UserRoutes = require('./controllers/UserController');

// Initialize Express app
const app = express();

// Connect to the database
sequelize
    .sync()
    .then(() => console.log('✅ Database connected successfully!'))
    .catch((err) => console.error('❌ Error connecting to the database:', err));

// Serve static files from the "public" directory
app.use('/', express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json

app.use(cors());

// Adicione antes das rotas
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'user-service' });
});

// API routes
app.use('/api/user', UserRoutes); // Shopping List routes

// Swagger UI for API documentation
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API running at http://localhost:${PORT}`);

});


module.exports = app;
