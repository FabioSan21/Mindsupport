const Usuario = require('../models/userModel');

const criarUsuario = async (req, res) => {
  try {
    const { nome, sobrenome, email, senha, tipo } = req.body;
    const [result] = await Usuario.criar({ nome, sobrenome, email, senha, tipo });
    res.status(201).json({ id: result.insertId, message: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const [rows] = await Usuario.listar();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { criarUsuario, listarUsuarios };
