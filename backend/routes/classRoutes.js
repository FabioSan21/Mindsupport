const express = require('express');
const { criarTurma, listarTurmas } = require('../controllers/classController');

const router = express.Router();

router.post('/turmas', criarTurma);
router.get('/turmas', listarTurmas);

module.exports = router;
