const db = require('../config/DBconnection.js');

const favoritosModel = {

    getAllFavoritos: async (id_usuario) => {

        return new Promise((resolve, reject) => {

            const query = 'SELECT * FROM favoritos WHERE id_usuario = ?';
            db.query(query, [id_usuario], (err, results) => {
                if (err) {
                    console.error('Erro ao buscar favoritos:', err);
                    reject(err);
                } else {
                    console.log('Favoritos encontrados:', results);
                    resolve(results);
                }
            });

        });

    },

    adicionarFavorito: async (id_usuario, id_video_api) => { 
        
        return new Promise((resolve, reject) => {

            const data_adicao = new Date().toISOString().split('T')[0];

            const query = 'INSERT INTO favoritos ( id_usuario, id_video_api, data_adicao) VALUES (?, ?, ?)';
            db.query(query, [id_usuario, id_video_api, data_adicao], (err, results) => {
                if (err) {
                    console.error('Erro ao inserir favorito:', err);
                    reject(err);
                } else {
                    console.log('Favorito inserido com sucesso:', results);
                    resolve(results);
                }
            });
        }); 

    },

    removerFavorito: async (id_usuario, id_video_api) => { 
        
        return new Promise((resolve, reject) => {
        
            const query = 'DELETE FROM favoritos WHERE id_video_api = ? AND id_usuario = ?';
            db.query(query, [id_usuario, id_video_api], (err, results) => {
                if (err) {
                    console.error('Erro ao remover favorito:', err);
                    reject(err);
                } else {
                    console.log('Favorito removido com sucesso:', results);
                    resolve(results);
                }
            });
        });

    },

};

module.exports = favoritosModel;