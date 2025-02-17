const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/users', userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
}); 