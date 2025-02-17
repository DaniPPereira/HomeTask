// Initialize Express app, connect to the database, and define routes
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./framework/db/postgres/config');
const { swaggerDocs, swaggerUi } = require('../public/swagger');

// Load environment variables from .env
require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to the database
sequelize
    .sync()
    .then(() => console.log('✅ Database connected successfully!'))
    .catch((err) => console.error('❌ Error connecting to the database:', err));

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.use('/api/shopping-lists', require('./controllers/ShoppingListController'));
app.use('/api/shopping-items', require('./controllers/ShoppingItemController'));
app.use('/api/item-categories', require('./controllers/ItemCategoryController'));

// Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'shopping-service' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 API running at http://localhost:${PORT}`);
});

module.exports = app;
