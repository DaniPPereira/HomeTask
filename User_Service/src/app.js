// express, a web framework for Node.js
const express = require('express');
// For interacting with the file system
const path = require('path');
// For parsing the body of incoming requests
const bodyParser = require('body-parser');
// For connecting to the database
const sequelize = require('./framework/db/postgres/config');

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


// API routes
app.use('/api/user', UserRoutes); // Shopping List routes



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
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`🚀 API running at http://localhost:${PORT}`);

});


module.exports = app;
