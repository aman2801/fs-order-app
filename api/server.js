require('dotenv').config();
const express = require('express');
const connectDB = require('../config/db');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

connectDB();

const app = express();

app.set('trust proxy', 1); // <-- Add this line

app.set('trust proxy', 1); // <-- Add this line

// Security Middleware
app.use(helmet());
app.use(cors()); // Consider more restrictive CORS options in production

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX || 100, // Max 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/auth', authLimiter);

// Body Parser
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Routes
app.use('/auth', require('../routes/auth'));
app.use('/products', require('../routes/products'));
app.use('/orders', require('../routes/orders'));
app.use('/orders/all', require('../routes/admiin//orders'));
app.use('/products/all', require('../routes/admin/products'));

// Basic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;

if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

