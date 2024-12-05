const db = require('../config/db');

const Question = {
  criar: async (dados) => {
    const { texto, idTurma } = dados;
    return db.execute('INSERT INTO perguntas (texto, id_turma) VALUES (?, ?)', [texto, idTurma]);
  },

  listar: async () => {
    return db.execute('SELECT * FROM perguntas');
  },
};

module.exports = Question;
