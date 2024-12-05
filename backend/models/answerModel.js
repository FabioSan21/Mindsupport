const db = require('../config/db'); // Conexão com o banco de dados

const AnswerModel = {
  // Criar uma nova resposta
  criar: async (dados) => {
    const { answer_text, question_id, student_id } = dados;
    return db.execute(
      'INSERT INTO answers (answer_text, question_id, student_id) VALUES (?, ?, ?)',
      [answer_text, question_id, student_id]
    );
  },

  // Listar todas as respostas
  listar: async () => {
    return db.execute('SELECT * FROM answers');
  },

  // Listar respostas por pergunta
  listarPorPergunta: async (question_id) => {
    return db.execute('SELECT * FROM answers WHERE question_id = ?', [question_id]);
  },

  // Listar respostas de um estudante específico
  listarPorEstudante: async (student_id) => {
    return db.execute('SELECT * FROM answers WHERE student_id = ?', [student_id]);
  },

  // Gerar plano de aula baseado nas respostas
  gerarPlanoDeAula: async (question_id) => {
    try {
      // Obter respostas relacionadas à pergunta
      const [respostas] = await AnswerModel.listarPorPergunta(question_id);

      if (respostas.length === 0) {
        throw new Error('Nenhuma resposta encontrada para a pergunta especificada.');
      }

      // Formatar as respostas para o envio à API do Gemini
      const formattedResponses = respostas.map((resposta) => ({
        id: resposta.id,
        text: resposta.answer_text,
        studentId: resposta.student_id,
      }));

      // Aqui você chama a função do serviço Gemini para gerar o plano de aula
      const lessonPlan = await generateLessonPlan(formattedResponses);

      return lessonPlan;
    } catch (error) {
      console.error('Erro ao gerar o plano de aula:', error.message);
      throw error;
    }
  }
};

module.exports = AnswerModel;
