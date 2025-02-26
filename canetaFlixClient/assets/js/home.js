const listagemFilmes = document.getElementById("listagemFilmes");
const card = document.getElementsByClassName("cardFilme");

async function listarFilmesHome(){
    
    fetch('http://localhost:3000/api/videos/filmes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(json => {

        const filmes = json.dadosFilmes;

        for (const filme of filmes) {
            
            listagemFilmes.innerHTML += `
            
                <picture class="cardFilme">
            
                    <img src="${filme.thumbnail}">
                    <h2>${filme.titulo}</h2>
                    
                </picture>
            
            `;

        }

        for (let i = 0; i < card.length; i++) {

            card[i].addEventListener('click', () => {
                window.location.href = `filme.html?id=${filmes[i].id}`;
            });

        }

    })
    .catch(error => console.error('Erro ao carregar a API:', error));
  
}

listarFilmesHome();