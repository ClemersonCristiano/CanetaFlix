const db = require('../config/DBconnection.js');
const bcrypt = require('bcrypt');

const usuarioModel = {

    // cadastrarUser: async (nome, email, pw) => {
    //     return new Promise((resolve, reject) => {

    //         // const hash = bcrypt.hashSync(pw, 10);
    //         const hash = pw;
    //         const data_cadastro = new Date().toISOString().split('T')[0];
    //         const status = 'ativo';
    //         const tipoUsuario = 2;
    //         const query = 'INSERT INTO usuario (nome, email, pw, data_cadastro, status, tipoUsuario) VALUES (?, ?, ?, ?, ?)';
    //         db.query(query, [nome, email, hash, data_cadastro, status, tipoUsuario], (err, results) => {
    //             if (err) {
    //                 console.error('Erro ao cadastrar usuário:', err);
    //                 reject(err);
    //             } else {
    //                 console.log('Usuário cadastrado com sucesso:', results);
    //                 resolve(results);
    //             }
    //         });
    //     });
    // },
    buscarUser: async (nome, pw) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuario WHERE nome = ? AND pw = ?';
            db.query(query, [nome, pw], (err, results) => {
                if (err) {
                    console.error('Erro ao buscar usuário:', err);
                    reject(err);
                } else {
                    console.log('Usuário encontrado:', results);
                    resolve(results);
                }
            });
        });
    },

    removerUser: async (id_usuario, pw) => {

        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM usuario WHERE id_usuario = ? AND pw = ?';
            db.query(query, [id_usuario, pw], (err, results) => {
                if (err) {
                    console.error('Erro ao remover usuário:', err);
                    reject(err);
                } else {
                    console.log('Usuário removido com sucesso:', results);
                    resolve(results);
                }
            });
        });

    }
}

module.exports = usuarioModel;