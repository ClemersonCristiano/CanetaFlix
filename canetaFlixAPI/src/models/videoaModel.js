
const db = require('../config/DBconnection.js');

const video = {
    getAll: async () => {
        return new Promise((resolve, reject) => {

        // Consulta todos os filmes
        const sql = ` SELECT 
                            v.id_video_api,
                            v.url_video,
                            m.titulo,
                            m.descricao,
                            m.thumbnail,
                            m.data_lancamento,
                            m.tipo_video,
                            GROUP_CONCAT(c.nome SEPARATOR ', ') AS categorias
                        FROM 
                            video v
                        JOIN 
                            metadados m ON v.id_Metadados = m.id_metadado_api
                        JOIN 
                            categoria_video cv ON v.id_video_api = cv.id_video_api
                        JOIN 
                            categoria c ON cv.id_categoria = c.id_categoria
                        GROUP BY 
                            v.id_video_api, v.url_video, m.titulo, m.descricao, m.thumbnail, m.data_lancamento, m.tipo_video; `;

            db.query(sql, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

module.exports = video;