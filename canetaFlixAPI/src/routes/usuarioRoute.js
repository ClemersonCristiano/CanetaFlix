const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');
const autenticarUsuario = require('../middleware/authMiddleware.js');

router.post('/login', usuarioController.Login); // Rota para login

router.post('/', usuarioController.cadastrarUser); // Rota para Cadastrar usuário

router.delete('/', autenticarUsuario, usuarioController.removerUser); // Rota para remover usuário

module.exports = router;