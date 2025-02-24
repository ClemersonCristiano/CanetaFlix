const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');

router.get('/:id_usuario', historicoController.listarHistorico); // Rota GET para listar histórico

router.get('/:id_usuario/:id_video_api', historicoController.adicionarFilmeHistorico); // Rota para adicionar filme ao histórico

module.exports = router;