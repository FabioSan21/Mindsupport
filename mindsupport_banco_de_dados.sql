-- Database
CREATE DATABASE IF NOT EXISTS mindsupport;
USE mindsupport;

-- Table: Users (Teachers and Students)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Classes (Mundos)
CREATE TABLE classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    teacher_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: Questions
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_text TEXT NOT NULL,
    class_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- Table: Answers
CREATE TABLE answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    answer_text TEXT NOT NULL,
    question_id INT NOT NULL,
    student_id INT DEFAULT NULL,
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: Lesson Plans
CREATE TABLE lesson_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plan_text TEXT NOT NULL,
    class_id INT NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- Inserir um professor (professor com ID autoincrementado)
INSERT INTO users (first_name, email, password) VALUES
    ('Professor 1', 'professor1@email.com', 'senha123');

-- Inserir Classes (Mundos) associadas ao professor
-- Aqui, LAST_INSERT_ID() vai garantir que as classes sejam associadas ao professor
INSERT INTO classes (name, teacher_id) VALUES
    ('Tristeza', LAST_INSERT_ID()),
    ('Alegria', LAST_INSERT_ID()),
    ('Ansiedade', LAST_INSERT_ID()),
    ('Raiva', LAST_INSERT_ID()),
    ('Medo', LAST_INSERT_ID()),
    ('Tédio', LAST_INSERT_ID()),
    ('Inveja', LAST_INSERT_ID()),
    ('Timidez', LAST_INSERT_ID()),
    ('Vergonha', LAST_INSERT_ID());

-- Inserir Perguntas (Associadas aos Mundos)
INSERT INTO questions (question_text, class_id) VALUES
    ('Qual o motivo da sua tristeza?', 1),
    ('Como você se sente quando isso acontece?', 1),
    ('Qual o motivo da sua alegria?', 2),
    ('Como você se sente quando isso acontece?', 2),
    ('Qual o motivo da sua ansiedade?', 3),
    ('Como você se sente quando isso acontece?', 3),
    ('Qual o motivo da sua raiva?', 4),
    ('Quando isso acontece, você fica com vontade de?', 4),
    ('Qual o motivo do seu medo?', 5),
    ('Como você se sente quando isso acontece?', 5),
    ('Qual motivo do seu tédio?', 6),
    ('O que você faz/poderia fazer para lidar com esse sentimento?', 6),
    ('Qual o motivo da sua inveja?', 7),
    ('Como você se sente quando isso acontece?', 7),
    ('Qual o motivo da sua timidez?', 8),
    ('Como você se sente quando isso acontece?', 8),
    ('Qual o motivo da sua vergonha?', 9),
    ('Como você se sente quando isso acontece?', 9);

-- Inserir Respostas (4 opções para cada pergunta)
INSERT INTO answers (question_id, answer_text) VALUES
    -- Respostas para Tristeza
    (1, 'Perda de algo ou alguém importante'),
    (1, 'Frustração com a vida'),
    (1, 'Sentimento de solidão'),
    (1, 'Problemas pessoais ou familiares'),
    (2, 'Melancolia ou depressão'),
    (2, 'Choro frequente'),
    (2, 'Desmotivação ou apatia'),
    (2, 'Falta de energia ou cansaço extremo'),

    -- Respostas para Alegria
    (3, 'Família'),
    (3, 'Amigos'),
    (3, 'Realizações pessoais'),
    (3, 'Outras conquistas importantes'),
    (4, 'Grato(a)'),
    (4, 'Motivado(a)'),
    (4, 'Emocionado(a)'),
    (4, 'Desejo de compartilhar'),

    -- Respostas para Ansiedade
    (5, 'Trabalho/Estudos'),
    (5, 'Relacionamentos (ex: amigos, família, etc.)'),
    (5, 'Saúde'),
    (5, 'Medo do futuro/Incertezas'),
    (6, 'Inquieto(a)'),
    (6, 'Desconforto físico (ex: coração acelerado)'),
    (6, 'Dificuldade de concentração'),
    (6, 'Medo ou preocupação intensa'),

    -- Respostas para Raiva
    (7, 'Família'),
    (7, 'Amigos'),
    (7, 'Escola'),
    (7, 'Outras situações irritantes'),
    (8, 'Chorar'),
    (8, 'Gritar'),
    (8, 'Ficar sozinho'),
    (8, 'Procurar ajuda'),

    -- Respostas para Medo
    (9, 'Medo de falhar'),
    (9, 'Medo de rejeição'),
    (9, 'Medo de perigo físico'),
    (9, 'Medo do desconhecido'),
    (10, 'Paralisado(a)'),
    (10, 'Inquieto(a) ou agitado(a)'),
    (10, 'Extremamente alerta'),
    (10, 'Desejo de fugir'),

    -- Respostas para Tédio
    (11, 'Solidão'),
    (11, 'Desesperança'),
    (11, 'Fadiga ou cansaço'),
    (11, 'Choro fácil'),
    (12, 'Desabafar com alguém'),
    (12, 'Fazer atividade física'),
    (12, 'Fazer uma reflexão ou meditação'),
    (12, 'Procurar ajuda profissional'),

    -- Respostas para Inveja
    (13, 'Sucesso de outra pessoa'),
    (13, 'Bens materiais de outra pessoa'),
    (13, 'Habilidades ou talentos de alguém'),
    (13, 'Relacionamentos de outra pessoa'),
    (14, 'Insatisfação pessoal'),
    (14, 'Tristeza ou frustração'),
    (14, 'Raiva ou ressentimento'),
    (14, 'Motivação para melhorar'),

    -- Respostas para Timidez
    (15, 'Interações sociais'),
    (15, 'Falando em público'),
    (15, 'Medo do julgamento dos outros'),
    (15, 'Experiências passadas negativas'),
    (16, 'Nervoso(a)'),
    (16, 'Vergonha'),
    (16, 'Isolado(a)'),
    (16, 'Desejo de evitar a situação'),

    -- Respostas para Vergonha
    (17, 'Cometer um erro em público'),
    (17, 'Medo do julgamento dos outros'),
    (17, 'Comparação com outras pessoas'),
    (17, 'Perder o controle em uma situação'),
    (18, 'Sinto vergonha'),
    (18, 'Fico muito embaraçado(a)'),
    (18, 'Sinto que estou sendo exposto(a) demais'),
    (18, 'Desejo fugir da situação');