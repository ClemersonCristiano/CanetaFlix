
const { getCategoriasFilmes } = require('../services/categoryService.js');
const { inserirMetadadosFilmes} = require('../services/metadataService.js');
const { inserirFilmes, inserirCategoriasFilmes } = require('../services/videoService.js');

const db = require('../config/DBconnection.js');
const API_KEY = process.env.API_KEY;
const tipo_video = 'filme';

async function inserirTipoUser() {
    
    const queryTipoUser = 'INSERT INTO tipo_usuario (nome) VALUES ("Administrador"), ("Usuário")';
    await new Promise((resolve, reject) => {
        db.query(queryTipoUser, (err, results) => {
            if (err) {
                console.error('Erro ao inserir tipos de usuário:', err);
                reject(err);
            } else {
                console.log('Tipos de usuário inseridos com sucesso:', results);
                resolve(results);
            }
        });
    });

}
async function inserirUsuarioBD() {

    const pw = bcrypt.hashSync('admin', 10);
    const data_cadastro = new Date().toISOString().split('T')[0];
    const queryUser = 'INSERT INTO usuarios (nome, email, pw, data_cadastro, status, id_tipo_usuario) VALUES ("admin", "admin@admin", ?, ? , "ativo", 1)';
    await new Promise((resolve, reject) => {
        db.query(queryUser, [pw], [data_cadastro], (err, results) => {
            if (err) {
                console.error('Erro ao inserir usuário:', err);
                reject(err);
            } else {
                console.log('Usuário inserido com sucesso:', results);
                resolve(results);
            }
        });
    })
}

// Função principal, requisita a lista de filmes mais populares da API e trata a resposta chamando as outras funções
async function getFilmesPopulares(db, API_KEY){
    console.log('\nInserindo Filmes Populares...........');
    console.log('\n{');

    for (let page = 1; page < 4; page++) {
        const url = `https://api.themoviedb.org/3/movie/popular?language=pt-br&page=${page}&region=brazil`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + API_KEY
            }
        };

        const res = await fetch(url, options);
        const json = await res.json();

        const filmesPopulares = JSON.parse(JSON.stringify(json));

        console.log(`\nQuantidede de Filmes Adicionados: ${filmesPopulares.results.length}\n`);
        for (const filme of filmesPopulares.results) {
            console.log(`Filme ${filme.title} inserido com sucesso! \n{`);
            await inserirMetadadosFilmes(db, filme, tipo_video);
            await inserirFilmes(db, filme, tipo_video);
            await inserirCategoriasFilmes(db, filme);
            console.log('}\n');
        }
    }
    console.log('}\n');
}

// Função para garantir a ordem de execução
async function main() {
    await inserirTipoUser();
    await inserirUsuarioBD();
    await getCategoriasFilmes(db, API_KEY);
    await getFilmesPopulares(db, API_KEY);
}

main();