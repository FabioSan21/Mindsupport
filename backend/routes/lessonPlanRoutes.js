const express = require('express');
const { criarPlano, listarPlanos, gerarPlanoComRespostas } = require('../controllers/lessonPlanController');

const router = express.Router();

// Rota para criar um novo plano de aula
router.post('/planos', criarPlano);

// Rota para listar todos os planos de aula
router.get('/planos', listarPlanos);

// Rota para gerar um plano de aula com base em respostas de alunos
router.post('/planos/gerar', gerarPlanoComRespostas);

module.exports = router;
