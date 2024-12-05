const db = require('../config/db');

const Turmas = {
  criar: async (turma) => {
    const { nome, idProfessor } = turma;
    return db.execute(
      'INSERT INTO turmas (nome, id_professor) VALUES (?, ?)',
      [nome, idProfessor]
    );
  },

  listar: async () => {
    return db.execute('SELECT * FROM turmas');
  },
};

module.exports = Turmas;
