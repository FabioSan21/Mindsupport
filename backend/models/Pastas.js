const db = require('../config/db');

const Pastas = {
  // Função para criar uma nova pasta
  criar: async (pasta) => {
    const { nome, cor } = pasta;
    return db.execute(
      'INSERT INTO pastas (nome, cor) VALUES (?, ?)',
      [nome, cor]
    );
  },

  // Função para listar todas as pastas
  listar: async () => {
    return db.execute('SELECT * FROM pastas');
  },
};

module.exports = Pastas;
