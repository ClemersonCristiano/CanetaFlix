
const { getCategoriasFilmes } = require('../services/categoryService.js');
const { inserirMetadadosFilmes} = require('../services/metadataService.js');
const { inserirFilmes, inserirCategoriasFilmes } = require('../services/videoService.js');

const db = require('../config/DBconnection.js');
const API_KEY = process.env.API_KEY;
const tipo_video = 'filme';

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