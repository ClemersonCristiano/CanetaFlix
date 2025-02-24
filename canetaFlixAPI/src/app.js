const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Importa e usa as rotas de vídeos
const videoRoutes = require('./routes/videoRoute.js');
app.use('/api/videos/filmes', videoRoutes);

// Importa e usa as rotas de favoritos
const favoritosRoute = require('./routes/favoritosRoute.js');
app.use('/api/usuario/favoritos', favoritosRoute);

module.exports = app;