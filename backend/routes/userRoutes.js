const express = require('express');
const { criarUsuario, listarUsuarios } = require('../controllers/userController');

const router = express.Router();

// Rota para criar um novo usuário
router.post('/', criarUsuario);

// Rota para listar usuários
router.get('/', listarUsuarios);

module.exports = router;
