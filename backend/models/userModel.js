const db = require('../config/db');

const Usuario = {
  criar: async (usuario) => {
    const { nome, sobrenome, email, senha, tipo } = usuario;
    return db.execute(
      'INSERT INTO usuarios (nome, sobrenome, email, senha, tipo) VALUES (?, ?, ?, ?, ?)',
      [nome, sobrenome, email, senha, tipo]
    );
  },

  listar: async () => {
    return db.execute('SELECT * FROM usuarios');
  },
};

module.exports = Usuario;
