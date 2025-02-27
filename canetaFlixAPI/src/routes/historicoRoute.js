const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');
const autenticarUsuario = require('../middleware/authMiddleware.js');

router.post('/listar', autenticarUsuario, historicoController.listarHistorico); // Rota para listar histórico

router.post('/', autenticarUsuario, historicoController.adicionarFilmeHistorico); // Rota para adicionar filme ao histórico

module.exports = router;