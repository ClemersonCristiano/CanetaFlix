const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');
const autenticarUsuario = require('../middleware/authMiddleware.js');

router.get('/:id_usuario', autenticarUsuario, historicoController.listarHistorico); // Rota GET para listar histórico

router.get('/:id_usuario/:id_video_api', autenticarUsuario, historicoController.adicionarFilmeHistorico); // Rota para adicionar filme ao histórico

module.exports = router;