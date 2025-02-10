
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

module.exports = { getCategoriasFilmes };