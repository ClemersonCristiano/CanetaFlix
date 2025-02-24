const db = require('../config/DBconnection.js');

const historicoModel = {

    listarHistorico: async (id_usuario) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM historico_visualizacao WHERE id_usuario = ?';
            db.query(query, [id_usuario], (err, results) => {
                if (err) {
                    console.error('Erro ao listar histórico:', err);
                    reject(err);
                } else {
                    console.log('Histórico listado com sucesso:', results);
                    resolve(results);
                }
            });
        });
    },

    adicionarFilmeHistorico: async (id_usuario, id_video_api) => {
        return new Promise((resolve, reject) => {
            const data_visualizacao = new Date().toISOString().split('T')[0];
            const query = 'INSERT INTO historico_visualizacao (id_usuario, id_video_api, data_visualizacao) VALUES (?, ?, ?)';
            db.query(query, [id_usuario, id_video_api, data_visualizacao], (err, results) => {
                if (err) {
                    console.error('Erro ao adicionar filme ao histórico:', err);
                    reject(err);
                } else {
                    console.log('Filme adicionado ao histórico com sucesso:', results);
                    resolve(results);
                }
            });
        });
    }

};

module.exports = historicoModel;