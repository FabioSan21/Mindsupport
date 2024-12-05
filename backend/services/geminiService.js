const axios = require('axios');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Configurações da API
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com'; // Confirme o endpoint correto
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Use a variável de ambiente

// Cliente base do Axios para chamadas à API do Gemini
const apiClient = axios.create({
  baseURL: GEMINI_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${GEMINI_API_KEY}`,
  },
});

// Função para gerar o plano de aula
const generateLessonPlan = async (studentResponses) => {
  try {
    // Corpo da requisição
    const data = {
      responses: studentResponses,
      targetEmotion: 'alegria', // Emoção-alvo que você deseja trabalhar
    };

    // Fazendo a requisição à API do Gemini
    const response = await apiClient.post('/generate', data);

    // Retorna o plano de aula gerado
    return response.data;
  } catch (error) {
    // Log detalhado de erros
    console.error('Erro ao integrar com a API do Gemini:', error.response?.data || error.message);
    throw new Error('Não foi possível gerar o plano de aula.');
  }
};

module.exports = { generateLessonPlan };
