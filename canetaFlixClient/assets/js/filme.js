const idFilme = new URLSearchParams(window.location.search).get('id');
console.log(`ID do filme: ${idFilme}`);

const dadosFilme = document.getElementById('dadosFilme');


fetch(`http://localhost:3000/api/videos/filmes/${idFilme}`)
.then(response => response.json())
.then(json => {

    const filme = json.dadosFilme;

    dadosFilme.innerHTML = `
        
        <iframe src="${filme.url}"> </iframe>

        <section class="containerInfosFilme"> 
            <h1>${filme.titulo}</h1>
            <p>${filme.descricao}</p>
        </section>
    `;

})