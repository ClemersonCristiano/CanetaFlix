const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');
const autenticarUsuario = require('../middleware/authMiddleware.js');

router.get('/:id_usuario', autenticarUsuario, favoritosController.listarFavoritos); // Rota GET para listar favoritos

router.get('/:id_usuario/adicionar/:id_video_api', autenticarUsuario, favoritosController.adicionarFavorito); // Rota para adicionar favorito

router.delete('/:id_usuario/remover/:id_video_api', autenticarUsuario, favoritosController.removerFavorito); // Rota para remover favorito

module.exports = router;