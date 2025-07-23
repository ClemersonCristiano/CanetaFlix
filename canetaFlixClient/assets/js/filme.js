const id_video_api = new URLSearchParams(window.location.search).get('id');
const dadosFilme = document.getElementById('dadosFilme');
const sessionToken = sessionStorage.getItem('token');

if (!sessionStorage.getItem("token")) {
    window.location.href = "login.html"; // Redireciona para o login
} else{
        fetch(`http://localhost:3000/api/videos/filmes`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: sessionToken
            },
        body: JSON.stringify({ id_video_api })
        })
        .then(response => response.json())
        .then(json => {
        
            const filme = json.dadosFilme;
            
            dadosFilme.innerHTML = `
            
                <iframe src="${filme.url}" frameborder="0" allowfullscreen></iframe>
                
                <section class="containerInfosFilme"> 
                    <h1>${filme.titulo}</h1>
                    <p>${filme.descricao}</p>
                    <p> Data de lançamento: ${filme.data_lancamento} </p>
                    <p> Categorias: ${filme.categorias} </p>
                </section>
            `;
                
            })
}