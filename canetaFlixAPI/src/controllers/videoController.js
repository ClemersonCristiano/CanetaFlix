const video = require('../models/videoaModel.js');

exports.listarFilmes = async (req, res) => {
    try {
        const results = await video.getAll();

        // Padronizando os dados da resposta
        const resultadoFilmesFormatados = results.map(video => ({
            id: video.id_video_api,
            titulo: video.titulo,
            thumbnail: video.thumbnail,
            descricao: video.descricao,
            categorias: video.categorias,
            data_lancamento: new Date(video.data_lancamento).toISOString().split('T')[0], // Formato YYYY-MM-DD
            tipo_video: video.tipo_video,
            url: video.url_video
        }));

        res.json({
            success: true,
            message: "Vídeos recuperados com sucesso",
            total: resultadoFilmesFormatados.length,
            dadosFilmes: resultadoFilmesFormatados
        });

    } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar vídeos",
            error: error.message
        });
    }
};