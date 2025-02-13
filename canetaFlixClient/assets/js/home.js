const listagemFilmes = document.getElementById("listagemFilmes");
const card = document.getElementsByClassName("cardFilme");

async function listarFilmesHome(){
    
    fetch('http://localhost:3000/api/videos/filmes')
    .then(response => response.json())
    .then(json => {

        const filmes = json.dadosFilmes;

        for (const filme of filmes) {
            
            listagemFilmes.innerHTML += `
            
                <div class="cardFilme">
            
                    <img src="${filme.thumbnail}">
                    
                </div>
            
            `;


            // console.log(filme);

        }

        // console.log(json.dadosFilmes);

        

    })
    .catch(error => console.error('Erro ao carregar a API:', error));
  
}

listarFilmesHome();