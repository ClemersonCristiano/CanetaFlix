
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

module.exports = { inserirMetadadosFilmes }