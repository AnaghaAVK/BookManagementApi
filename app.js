require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./src/routes/bookRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('API is working');
});

// MongoDB Atlas connection using connection string that created, which is mentioned in .env file as "MONGO_URI".
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/books', bookRoutes);

module.exports = app;
