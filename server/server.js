const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const authRoutes =  require('./Routes/auth');

app.use(cors());


 app.use('/api/auth', authRoutes);



app.listen(5000, () => console.log('Server running on port 5000'));
