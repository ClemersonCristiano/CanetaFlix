const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const autenticarUsuario = require('../middleware/authMiddleware.js');

router.get('/', autenticarUsuario, videoController.listarFilmes); // Rota GET para listar vídeos

router.get('/:id', autenticarUsuario, videoController.getFilmeById); // Rota para buscar um filme por ID

module.exports = router;