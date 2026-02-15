const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

module.exports = app;