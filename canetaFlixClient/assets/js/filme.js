const idFilme = new URLSearchParams(window.location.search).get('id');
console.log(`ID do filme: ${idFilme}`);

const dadosFilme = document.getElementById('dadosFilme');


// fetch(`http://localhost:3000/api/videos/filmes/${idFilme}`)
// .then(response => response.json()).then(json => {

//     console.log(json);
// })




dadosFilme.innerHTML = `

    <iframe src="" id="SuperFlixAPIContainerVideo"></iframe>

`;
