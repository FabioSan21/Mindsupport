const Turmas = require('../models/classModel');

const criarTurma = async (req, res) => {
  try {
    const { nome, idProfessor } = req.body;

    if (!nome || !idProfessor) {
      return res.status(400).json({ error: 'Nome e idProfessor são obrigatórios' });
    }

    const [result] = await Turmas.criar({ nome, idProfessor });
    res.status(201).json({ id: result.insertId, message: 'Turma criada com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listarTurmas = async (req, res) => {
  try {
    const [rows] = await Turmas.listar();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { criarTurma, listarTurmas };
