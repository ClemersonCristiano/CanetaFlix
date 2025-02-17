const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', videoController.listarFilmes); // Rota GET para listar vídeos

router.get('/:id', videoController.getFilmeById); // Rota para buscar um filme por ID

module.exports = router;