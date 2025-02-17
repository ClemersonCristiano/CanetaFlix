const videoModel = require('../models/videoModel');

exports.listarFilmes = async (req, res) => {
    try {
        const results = await videoModel.getAll();

        // Padronizando os dados da resposta
        const resultadoFilmesFormatados = results.map(filme => ({
            id: filme.id_video_api,
            titulo: filme.titulo,
            thumbnail: filme.thumbnail,
            descricao: filme.descricao,
            categorias: filme.categorias,
            data_lancamento: new Date(filme.data_lancamento).toISOString().split('T')[0], // Formato YYYY-MM-DD
            tipo_video: filme.tipo_video,
            url: filme.url_video
        }));

        res.json({
            success: true,
            message: "Filmes recuperados com sucesso",
            total: resultadoFilmesFormatados.length,
            dadosFilmes: resultadoFilmesFormatados
        });

    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar filmes",
            error: error.message
        });
    }
};

exports.getFilmeById = async (req, res) => {
    try {

        const id = req.params.id; // Pega o ID da URL

        if (!id) {
            return res.status(400).json({ success: false, message: "ID do vídeo não fornecido" });
        }

        const filme = await videoModel.getById(id);

        if (!filme) {
            return res.status(404).json({ success: false, message: "Filme não encontrado" });
        }

        // Formata a resposta
        res.json({
            success: true,
            message: "Filme recuperado com sucesso",
            dadosFilme: {
                id: filme.id_video_api,
                titulo: filme.titulo,
                descricao: filme.descricao,
                thumbnail: filme.thumbnail,
                categorias: filme.categorias,
                data_lancamento: filme.data_lancamento ? new Date(filme.data_lancamento).toISOString().split('T')[0] : "Data não disponível",
                tipo_video: filme.tipo_video,
                url: filme.url_video
            }
        });
    } catch (error) {
        console.error("Erro ao buscar filme por ID:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar filme",
            error: error.message
        });
    }
};