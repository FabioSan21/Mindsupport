const express = require('express');
const { createQuestion, listQuestions } = require('../controllers/questionController');

const router = express.Router();

// Define as rotas usando as funções do controlador
router.post('/questions', createQuestion); // POST para criar uma questão
router.get('/questions', listQuestions);  // GET para listar questões

module.exports = router; // Exporta o roteador
