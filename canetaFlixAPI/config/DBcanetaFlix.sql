-- Exemplo de query quando user selecionar o filme
-- SELECT 
--     v.id_video_api,
--     v.url_video,
--     m.titulo,
--     m.descricao,
--     m.thumbnail,
--     m.data_lancamento,
--     m.tipo_video
-- FROM 
--     video v
-- JOIN 
--     metadados m ON v.id_Metadados = m.id_metadado_api
-- WHERE 
--     v.id_video_api = 945961;


-- Criando o banco de dados
CREATE DATABASE IF NOT EXISTS DBcanetaFlix;
USE DBcanetaFlix;

-- Criando a tabela de tipos de usuário
CREATE TABLE tipo_usuario (
    id_tipo INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_tipo)
);

-- Criando a tabela de usuários
CREATE TABLE usuario (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    pw VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    tipo_usuario INT NOT NULL,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (tipo_usuario) REFERENCES tipo_usuario(id_tipo) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criando a tabela de metadados
CREATE TABLE metadados (
    id_metadado_api VARCHAR(50) NOT NULL,
    id_video_api VARCHAR(50) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    thumbnail VARCHAR(255) NULL DEFAULT NULL,
    data_lancamento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo_video VARCHAR(10) NOT NULL,
    PRIMARY KEY (id_metadado_api)
);

-- Criando a tabela de vídeos
CREATE TABLE video (
    id_video_api VARCHAR(50) NOT NULL,
    url_video TEXT NOT NULL,
    id_Metadados VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_video_api),
    FOREIGN KEY (id_Metadados) REFERENCES metadados(id_metadado_api) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criando a tabela de categorias
CREATE TABLE categoria (
    id_categoria INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_categoria)
);

-- Criando a tabela de relação categoria-vídeo
CREATE TABLE categoria_video (
    id_categoria_video INT NOT NULL AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    id_video_api VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_categoria_video),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_video_api) REFERENCES video(id_video_api) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criando a tabela de histórico de visualizações
CREATE TABLE historico_visualizacao (
    id_visualizacao INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_video_api VARCHAR(50) NOT NULL,
    data_visualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_visualizacao),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_video_api) REFERENCES video(id_video_api) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criando a tabela de favoritos
CREATE TABLE favoritos (
    id_favorito INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_video_api VARCHAR(50) NOT NULL,
    data_adicao DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_favorito),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_video_api) REFERENCES video(id_video_api) ON DELETE CASCADE ON UPDATE CASCADE
);