const axios = require('axios');  // Para fazer requisições à API externa
const fs = require('fs');  // Para manipulação de arquivos
const path = require('path');  // Para lidar com caminhos de diretórios
const db = require('../config/db');

const LessonPlans = {
  // Função para fazer a requisição à API do Gemini e salvar o plano de aula na pasta da turma
  criar: async (class_id) => {
    try {
      // Faça a requisição para a API do Gemini para obter o plano de aula
      const response = await axios.post('URL_DA_API_DO_GEMINI', {
        class_id: class_id,  // Envia o ID da classe como dado para a API
      });

      // Supondo que a resposta da API seja um objeto com o texto do plano
      const plan_text = response.data.plan_text;  // O conteúdo do plano de aula retornado pela API

      // Obter o caminho da pasta da turma onde o plano de aula será salvo
      const folderPath = path.join(__dirname, '..', 'turmas', class_id.toString());

      // Verificar se a pasta da turma existe, caso contrário, criar a pasta
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Definir o nome do arquivo (por exemplo, "plano_de_aula.txt")
      const filePath = path.join(folderPath, 'plano_de_aula.txt');

      // Salvar o plano de aula no arquivo dentro da pasta da turma
      fs.writeFileSync(filePath, plan_text, 'utf8');

      // Inserir o plano de aula no banco de dados
      const result = await db.execute(
        'INSERT INTO lesson_plans (plan_text, class_id) VALUES (?, ?)',
        [plan_text, class_id]
      );
      
      return result;  // Retorna o resultado da inserção no banco
    } catch (error) {
      console.error('Erro ao integrar com a API do Gemini ou salvar o plano de aula:', error);
      throw error;  // Lança o erro para ser tratado pelo controller
    }
  },

  // Função para listar os planos de aula
  listar: async () => {
    return db.execute('SELECT * FROM lesson_plans');
  },
};

module.exports = LessonPlans;
