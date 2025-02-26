const usuarioModel = require('../models/usuarioModel');
const { gerarToken } = require('../utils/jwtUtils');

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

exports.Login = async (req, res) => {
    try {
        const { nome, pw } = req.body;
        const usuario = await usuarioModel.Login(nome, pw);
        
        if (!usuario) {
            return res.status(401).json({ success: false, message: 'Usuário ou senha incorretos' });
        }

        const token = gerarToken({ id: usuario.id, nome: usuario.nome });

        res.json({
            success: true,
            message: "Login bem-sucedido",
            id_usuario: usuario.id,
            token
        });

    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
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