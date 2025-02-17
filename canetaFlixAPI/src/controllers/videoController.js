const listarFilmesBD = require('../models/videoaModel.js');

exports.listarFilmes = async (req, res) => {
    try {
        const results = await listarFilmesBD.getAll();

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
        console.error("Erro ao buscar vídeos:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar vídeos",
            error: error.message
        });
    }
};