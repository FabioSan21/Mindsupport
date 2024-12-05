const { criar, listar, gerarPlanoDeAula: _gerarPlanoDeAula } = require('../models/answerModel'); // Corrige a importação para CommonJS

// Criar uma nova resposta
async function criarResposta(req, res) {
  try {
    const { answer_text, question_id, student_id } = req.body;

    if (!answer_text || !question_id || !student_id) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios: answer_text, question_id e student_id.' });
    }

    // Salva a nova resposta no banco de dados
    const [result] = await criar({ answer_text, question_id, student_id });

    res.status(201).json({ id: result.insertId, message: 'Resposta criada com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Listar todas as respostas
const listarRespostas = async (req, res) => {
  try {
    // Obtém todas as respostas do banco de dados
    const [rows] = await listar();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Gerar plano de aula baseado nas respostas usando o Gemini
const gerarPlanoDeAula = async (req, res) => {
  try {
    const { question_id } = req.params;

    if (!question_id) {
      return res.status(400).json({ error: 'O ID da pergunta é obrigatório.' });
    }

    // Usa o modelo Answer para buscar as respostas e gerar o plano de aula
    const planoDeAula = await _gerarPlanoDeAula(question_id);

    res.status(200).json({
      message: 'Plano de aula gerado com sucesso!',
      plano: planoDeAula,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  criarResposta,
  listarRespostas,
  gerarPlanoDeAula,
};
