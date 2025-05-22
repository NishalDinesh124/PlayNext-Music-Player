require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/auth');
const songsRoutes = require('./Routes/song')
//"https://play-next-music-player.vercel.app"
const app = express();

// Use correct allowed origin
const allowedOrigin = "https://play-next-music-player.vercel.app"
// CORS setup
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); // Required to parse JSON bodies
app.use('/api/auth', authRoutes);
app.use('/api/songs', songsRoutes);

const uri = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
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
