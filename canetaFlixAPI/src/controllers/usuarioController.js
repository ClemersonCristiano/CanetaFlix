const usuarioModel = require('../models/usuarioModel');

exports.cadastrarUser = async (req, res) => {
    try {
        const { nome, email, pw } = req.body;
        const result = await usuarioModel.cadastrarUser(nome, email, pw);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
};

exports.buscarUser = async (req, res) => {
    try {
        const { nome, pw } = req.body;
        const result = await usuarioModel.buscarUser(nome, pw);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

exports.removerUser = async (req, res) => {
    try {
        const { id_usuario, pw } = req.body;
        const result = await usuarioModel.removerUser(id_usuario, pw);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        res.status(500).json({ error: 'Erro ao remover usuário' });
    }
};