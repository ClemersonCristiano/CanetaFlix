const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');

router.get('/', favoritosController.listarFavoritos); // Rota GET para listar favoritos

router.get('/:id_usuario/:id_video_api', favoritosController.adicionarFavorito); // Rota para adicionar favorito

router.delete('/:id_usuario/:id_video_api', favoritosController.removerFavorito); // Rota para remover favorito

module.exports = router;