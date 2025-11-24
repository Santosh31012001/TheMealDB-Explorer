const express = require('express');
const cors = require('cors');
const mealRoutes = require('./routes/mealRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', mealRoutes);

module.exports = app;
