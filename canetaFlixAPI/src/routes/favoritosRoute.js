const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');
const autenticarUsuario = require('../middleware/authMiddleware.js');

router.get('/', autenticarUsuario, favoritosController.listarFavoritos); // Rota GET para listar favoritos

router.post('/', autenticarUsuario, favoritosController.adicionarFavorito); // Rota para adicionar favorito

router.delete('/', autenticarUsuario, favoritosController.removerFavorito); // Rota para remover favorito

module.exports = router;