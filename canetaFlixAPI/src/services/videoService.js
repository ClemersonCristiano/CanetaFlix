
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

// // Função principal, requisita a lista de filmes mais populares da API e trata a resposta chamando as outras funções
// async function getFilmesPopulares(db, API_KEY){
//     console.log('\nInserindo Filmes Populares...........');
//     console.log('\n{');

//     for (let page = 1; page < 4; page++) {
//         const url = `https://api.themoviedb.org/3/movie/popular?language=pt-br&page=${page}&region=brazil`;
//         const options = {
//             method: 'GET',
//             headers: {
//                 accept: 'application/json',
//                 Authorization: 'Bearer ' + API_KEY
//             }
//         };

//         const res = await fetch(url, options);
//         const json = await res.json();

//         const filmesPopulares = JSON.parse(JSON.stringify(json));

//         for (const filme of filmesPopulares.results) {
//             console.log(`Filme ${filme.title} inserido com sucesso! {`);
//             await inserirMetadadosFilmes(db, filme, tipo_video);
//             await inserirFilmes(db, filme, tipo_video);
//             await inserirCategoriasFilmes(db, filme);
//             console.log('}\n');
//         }
//     }
//     console.log('}\n');
// }

module.exports = { inserirFilmes, inserirCategoriasFilmes};