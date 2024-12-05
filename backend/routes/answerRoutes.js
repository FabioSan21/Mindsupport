const express = require('express');
const { criarResposta, listarRespostas, gerarPlanoDeAula } = require('../controllers/answerController');

const router = express.Router();

// Rota para criar uma nova resposta
router.post('/respostas', criarResposta);

// Rota para listar todas as respostas
router.get('/respostas', listarRespostas);

// Rota para gerar plano de aula com base nas respostas
router.get('/respostas/plano-aula/:question_id', gerarPlanoDeAula);

module.exports = router;
