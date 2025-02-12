const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', videoController.listarVideos); // Rota GET para listar vídeos

module.exports = router;