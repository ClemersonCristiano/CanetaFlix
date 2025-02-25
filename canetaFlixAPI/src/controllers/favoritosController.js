const favoritosModel = require('../models/favoritosModel');

exports.listarFavoritos = async (req, res) => {
    try {
        
        const id_usuario = req.body;
        const favoritos = await favoritosModel.getAllFavoritos(id_usuario);

        res.json({ 
            success: true, 
            message: "Favoritos recuperados com sucesso", 
            total: favoritos.length, dadosFavoritos: favoritos 
        }); 

    } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        res.status(500).json({ 
            success: false, 
            message: "Erro ao buscar favoritos", error: error.message 
        }); 
    }
};

exports.adicionarFavorito = async (req, res) => {
    try {
        
        const {id_usuario, id_video_api} = req.body;

        const favorito = await favoritosModel.adicionarFavorito(id_usuario, id_video_api);

        res.json({ 
            success: true, 
            message: "Favorito adicionado com sucesso", 
            dadosFavorito: favorito 
        }); 

    } catch (error) {
        console.error("Erro ao adicionar favorito:", error);
        res.status(500).json({ 
            success: false, 
            message: "Erro ao adicionar favorito", error: error.message 
        }); 
    }    
};

exports.removerFavorito = async (req, res) => {
    try {

        const {id_usuario, id_video_api} = req.body;
        
        const favorito = await favoritosModel.removerFavorito(id_usuario, id_video_api);

        res.json({ 
            success: true, 
            message: "Favorito removido com sucesso", 
            dadosFavorito: favorito 
        }); 

    } catch (error) {
        console.error("Erro ao remover favorito:", error);
        res.status(500).json({ 
            success: false, 
            message: "Erro ao remover favorito", error: error.message 
        }); 
    }    
};