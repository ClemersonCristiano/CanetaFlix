require('dotenv').config();
const db = require('./DBconnection.js');
const API_KEY = process.env.API_KEY;
const tipo_video = 'filme';

// Função que requisita as categorias/gêneros de filmes da API
async function getCategoriasFilmes(db, API_KEY) {
    console.log('\nInserindo Categorias de Filmes...........');
    console.log('\n{');

    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-br';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        }
    };

    const res = await fetch(url, options);
    const json = await res.json();

    const categorias = JSON.parse(JSON.stringify(json));
    console.log('\nInserindo Categorias de Filmes...........');
    for (const categoria of categorias.genres) {
        console.log(`categoria ${categoria.name} inserida com sucesso! {`);
        const query = 'INSERT INTO categoria (id_categoria, nome) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            db.query(query, [categoria.id, categoria.name], (err, results) => {
                if (err) {
                    console.error('Erro ao inserir categoria:', err);
                    reject(err);
                } else {
                    console.log('Categoria inserida com sucesso:', results);
                    resolve(results);
                }
            });
        });
        console.log('}\n');
    }
    console.log('}\n');
}

// Função que insere os metadados retornados pela API
async function inserirMetadadosFilmes(db, filme, tipo_video){
    const posterURL = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`;

    // Query para salvar os metadados do filme
    const queryMetadados = 'INSERT INTO metadados (id_metadado_api, id_video_api, titulo, descricao, thumbnail, data_lancamento, tipo_video) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await new Promise((resolve, reject) => {
        db.query(queryMetadados, [filme.id, filme.id, filme.title, filme.overview, posterURL, filme.release_date, tipo_video], (err, results) => {
            if (err) {
                console.error('Erro ao inserir filme:', err);
                reject(err);
            } else {
                console.log('Metadados de filme inseridos com sucesso:', results);
                resolve(results);
            }
        });
    });
}

// Função que insere os filmes na tabela videos
async function inserirFilmes(db, filme, tipo_video){
    const url_video = `https://superflixapi.link/${tipo_video}/${filme.id}`; // Montagem do endpoint da API de videos
    const queryVideo = 'INSERT INTO video (id_video_api, url_video, id_Metadados) VALUES (?, ?, ?)';
    await new Promise((resolve, reject) => {
        db.query(queryVideo, [filme.id, url_video, filme.id], (err, results) => {
            if (err) {
                console.error('Erro ao inserir filme:', err);
                reject(err);
            } else {
                console.log('Filme inserido com sucesso:', results);
                resolve(results);
            }
        });
    });
}

// Função para relacionar o filme com uma categoria/gênero 
async function inserirCategoriasFilmes(db, filme){
    const categoriasVideos = filme.genre_ids;
    for (const id of categoriasVideos) {
        const queryCategoriaVideo = 'INSERT INTO categoria_video (id_categoria, id_video_api) VALUES (?, ?)';
        await new Promise((resolve, reject) => {
            db.query(queryCategoriaVideo, [id, filme.id], (err, results) => {
                if (err) {
                    console.error('Erro ao inserir filme em categoria:', err);
                    reject(err);
                } else {
                    console.log('Filme inserido em categoria com sucesso:', results);
                    resolve(results);
                }
            });
        });
    }
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

        for (const filme of filmesPopulares.results) {
            console.log(`Filme ${filme.title} inserido com sucesso! {`);
            await inserirMetadadosFilmes(db, filme, tipo_video);
            await inserirFilmes(db, filme, tipo_video);
            await inserirCategoriasFilmes(db, filme);
            console.log('}\n');
        }
    }
    console.log('}\n');
}

// Função principal para garantir a ordem de execução
async function main() {
    await getCategoriasFilmes(db, API_KEY);
    await getFilmesPopulares(db, API_KEY);
}

main();