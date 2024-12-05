const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db'); // Importar conexão com o banco de dados

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Permite requisições de diferentes origens
app.use(express.json()); // Substitui o body-parser, que já é incluído no Express

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const lessonPlanRoutes = require('./routes/lessonPlanRoutes');
const pastasRoutes = require('./routes/pastasRoutes');

// Configurar rotas
app.use('/api/users', userRoutes);           // Rotas de usuários
app.use('/api/classes', classRoutes);        // Rotas de turmas
app.use('/api/questions', questionRoutes);   // Rotas de perguntas
app.use('/api/answers', answerRoutes);       // Rotas de respostas
app.use('/api/lesson-plans', lessonPlanRoutes); // Rotas de planos de aula
app.use('/pastas', pastasRoutes);

// Rota para exibir turmas
app.get('/classes', (req, res) => {
  const query = 'SELECT * FROM classes'; // SQL para pegar todas as turmas

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err.message);
      return res.status(500).send('Erro ao consultar o banco de dados');
    }
    // Renderizando os dados em uma página HTML
    res.send(`
      <html>
        <head>
          <title>Lista de Turmas</title>
        </head>
        <body>
          <h1>Turmas Cadastradas</h1>
          <ul>
            ${results.map(turma => `<li>${turma.name} (Criada em: ${turma.created_at})</li>`).join('')}
          </ul>
        </body>
      </html>
    `);
  });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Porta e inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
