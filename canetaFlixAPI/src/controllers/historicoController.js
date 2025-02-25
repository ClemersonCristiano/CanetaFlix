const db = require('../config/DBconnection.js');
const historicoModel = require('../models/historicoModel.js');

exports.listarHistorico = async (req, res) => {

    try {
        const { id_usuario } = req.body;
        const historico = await historicoModel.listarHistorico(id_usuario);

        res.json({ 
            success: true, 
            message: "Histórico recuperado com sucesso", 
            total: historico.length, dadosHistorico: historico 
        }); 

    } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        res.status(500).json({ 
            success: false, 
            message: "Erro ao buscar histórico", error: error.message 
        }); 
    }

}

exports.adicionarFilmeHistorico = async (req, res) => {

    try {
        const {id_usuario, id_video_api} = req.body;
        const filme = await historicoModel.adicionarFilmeHistorico(id_usuario, id_video_api);

        res.json({ 
            success: true, 
            message: "Filme adicionado ao histórico com sucesso", 
            dadosFilme: filme 
        }); 

    } catch (error) {
        console.error("Erro ao adicionar filme ao histórico:", error);
        res.status(500).json({ 
            success: false, 
            message: "Erro ao adicionar filme ao histórico", error: error.message 
        }); 
    }
}