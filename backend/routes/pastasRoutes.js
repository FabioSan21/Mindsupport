const express = require('express');
const router = express.Router();
const pastasController = require('../controllers/pastasController');

// Rota para adicionar uma pasta
router.post('/adicionar', pastasController.adicionarPasta);

// Rota para listar as pastas
router.get('/listar', pastasController.listarPastas);

module.exports = router;
