const db = require('../config/DBconnection.js');
const bcrypt = require('bcrypt');

const usuarioModel = {

    cadastrarUser: async (nome, email, pw) => {
        return new Promise((resolve, reject) => {

            const hash = bcrypt.hashSync(pw, 10);
            const data_cadastro = new Date().toISOString().split('T')[0];
            const status = 'ativo';
            const tipo_usuario = 2;
            const query = 'INSERT INTO usuario (nome, email, pw, data_cadastro, status, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(query, [nome, email, hash, data_cadastro, status, tipo_usuario], (err, results) => {
                if (err) {
                    console.error('Erro ao cadastrar usuário:', err);
                    reject(err);
                } else {
                    console.log('Usuário cadastrado com sucesso:', results);
                    resolve(results);
                }
            });
        });
    },

    Login: async (nome, pw) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuario WHERE nome = ?';
            db.query(query, [nome], (err, results) => {
                if (err) {
                    console.error('Erro ao buscar usuário:', err);
                    return reject(err);
                }
    
                if (results.length === 0) {
                    console.log('Usuário não encontrado');
                    return resolve(null); 
                }
    
                const usuario = results[0];
                const isValid = bcrypt.compareSync(pw, usuario.pw);
    
                if (isValid) {
                    console.log('Usuário encontrado');
                    return resolve(usuario);
                } else {
                    console.log('Usuário ou Senha incorreta');
                    return resolve(null);
                }
            });
        });
    },

    removerUser: async (id_usuario, pw) => {

        return new Promise((resolve, reject) => {

            const queryUser = 'SELECT * FROM usuario WHERE id_usuario = ?';
            db.query(queryUser, [id_usuario], (err, results) => {
                if (err) {
                    console.error('Erro ao buscar usuário:', err);
                    reject(err);
                } else{
                    const pwDB = results[0].pw;
                    const isValid = bcrypt.compareSync(pw, pwDB);
                    if (!isValid) {
                        console.log('Senha incorreta');
                        resolve([]);
                    } else {
                        const query = 'DELETE FROM usuario WHERE id_usuario = ?';
                        db.query(query, [id_usuario], (err, results) => {
                            if (err) {
                                console.error('Erro ao remover usuário:', err);
                                reject(err);
                            } else {
                                console.log('Usuário removido com sucesso:', results);
                                resolve(results);
                            }
                        });
                        }
                }
            });
        });

    }
}

module.exports = usuarioModel;