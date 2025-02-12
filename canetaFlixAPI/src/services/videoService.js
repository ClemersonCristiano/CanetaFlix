
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

module.exports = { inserirFilmes, inserirCategoriasFilmes};