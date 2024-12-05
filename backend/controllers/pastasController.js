const Pastas = require('../models/Pastas');

// Função para adicionar uma pasta
const adicionarPasta = async (req, res) => {
  const { nome, cor } = req.body;

  if (!nome || !cor) {
    return res.status(400).send('Nome e cor são obrigatórios');
  }

  try {
    await Pastas.criar({ nome, cor });
    res.status(200).send('Pasta criada com sucesso');
  } catch (error) {
    console.error('Erro ao criar a pasta:', error);
    res.status(500).send('Erro ao salvar a pasta');
  }
};

// Função para listar pastas
const listarPastas = async (req, res) => {
  try {
    const [pastas] = await Pastas.listar();
    res.status(200).json(pastas);
  } catch (error) {
    console.error('Erro ao listar pastas:', error);
    res.status(500).send('Erro ao listar pastas');
  }
};

module.exports = {
  adicionarPasta,
  listarPastas,
};
