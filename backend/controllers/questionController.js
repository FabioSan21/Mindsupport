// questionController.js
const Question = require('../models/questionModel');

// Criar uma nova pergunta
const createQuestion = async (req, res) => {
  try {
    const { text, classId } = req.body;
    const [result] = await Question.criar({ texto: text, idTurma: classId }); // Chamar Question.criar
    res.status(201).json({ id: result.insertId, message: 'Question created successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as perguntas
const listQuestions = async (req, res) => {
  try {
    const [rows] = await Question.listar(); // Chamar Question.listar
    res.status(200).json(rows);  // Retorna todas as perguntas
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createQuestion, listQuestions };
