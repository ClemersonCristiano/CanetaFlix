const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Importa e usa as rotas de vídeos
const videoRoutes = require('./routes/videoRoute.js');
app.use('/api/videos/filmes', videoRoutes);

module.exports = app;