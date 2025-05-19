require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/auth');

const app = express();

// Use correct allowed origin
const allowedOrigin = "https://play-next-music-player.vercel.app" || "http://localhost:3000"
// CORS setup
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); // Required to parse JSON bodies
app.use('/api/auth', authRoutes);

const uri = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("Mongo URI:", uri);

    await mongoose.connect(uri);

    console.log("DB Connection Successful");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Mongo connection failed:", err.message);
  }
};

startServer();
