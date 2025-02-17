// Initialize Express app, connect to the database, and define routes
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./framework/db/postgres/config');
const { swaggerDocs, swaggerUi } = require('../public/swagger');
const cors = require('cors');

// Load environment variables from .env
require('dotenv').config();

// Import routes
const shoppingListRoutes = require('./controllers/shoppingListController');
const shoppingItemRoutes = require('./controllers/shoppingItemController');
const itemCategoryRoutes = require('./controllers/itemCategoryController');
const shoppingRoutes = require('./routes/shoppingRoutes');

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

// API routes
app.use('/api/shopping-lists', shoppingListRoutes); // Shopping List routes
app.use('/api/shopping-items', shoppingItemRoutes); // Shopping Item routes
app.use('/api/item-categories', itemCategoryRoutes); // Item Category routes
app.use('/api/shopping', shoppingRoutes);

// Swagger UI for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'shopping-service' });
});

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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 API running at http://localhost:${PORT}`);
});

module.exports = app;
