const Planos = require('../models/lessonPlanModel');
const { generateLessonPlan } = require('../services/geminiService');
const fs = require('fs');
const path = require('path');

/**
 * Cria um plano de aula e salva o arquivo gerado na pasta da turma.
 */
const criarPlano = async (req, res) => {
  try {
    const { nome, idProfessor, respostasAlunos, class_id } = req.body;

    if (!nome || !idProfessor || !respostasAlunos || !Array.isArray(respostasAlunos) || !class_id) {
      return res.status(400).json({ error: 'Nome, idProfessor, respostasAlunos e class_id são obrigatórios.' });
    }

    // Chama a API para gerar o plano de aula com base nas respostas dos alunos
    const planoGerado = await generateLessonPlan(respostasAlunos);

    // Obtém o conteúdo do plano de aula gerado
    const planText = planoGerado.content;

    // Caminho onde o plano de aula será salvo
    const folderPath = path.join(__dirname, '..', 'turmas', class_id.toString());
    
    // Verifica se a pasta da turma existe, se não, cria a pasta
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Salva o plano de aula gerado em um arquivo dentro da pasta da turma
    const filePath = path.join(folderPath, 'plano_de_aula.txt');
    fs.writeFileSync(filePath, planText, 'utf8');

    // Salva o plano de aula no banco de dados
    const [result] = await Planos.criar({
      nome,
      idProfessor,
      conteudo: planText,
      class_id,
    });

    // Retorna uma resposta de sucesso
    res.status(201).json({
      id: result.insertId,
      message: 'Plano criado com sucesso!',
      plano: planoGerado,
    });
  } catch (err) {
    console.error('Erro ao criar plano de aula:', err.message);
    res.status(500).json({ error: 'Erro ao criar o plano de aula' });
  }
};

/**
 * Lista todos os planos de aula.
 */
const listarPlanos = async (req, res) => {
  try {
    const [rows] = await Planos.listar();
    res.status(200).json(rows);
  } catch (err) {
    console.error('Erro ao listar planos de aula:', err.message);
    res.status(500).json({ error: 'Erro ao listar os planos de aula' });
  }
};

/**
 * Gera um plano de aula baseado em respostas de alunos.
 */
const gerarPlanoComRespostas = async (req, res) => {
  try {
    const { respostasAlunos } = req.body;

    if (!respostasAlunos || !Array.isArray(respostasAlunos)) {
      return res.status(400).json({ error: 'respostasAlunos é obrigatório e deve ser um array.' });
    }

    // Gera o plano de aula a partir das respostas dos alunos
    const planoGerado = await generateLessonPlan(respostasAlunos);

    res.status(200).json({
      message: 'Plano de aula gerado com sucesso!',
      plano: planoGerado,
    });
  } catch (err) {
    console.error('Erro ao gerar plano de aula:', err.message);
    res.status(500).json({ error: 'Erro ao gerar o plano de aula' });
  }
};

module.exports = { criarPlano, listarPlanos, gerarPlanoComRespostas };
