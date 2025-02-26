const menuHeader = document.getElementById("menuHeader");

let botaoMenu = document.getElementById("botaoMenuMobile");
let menuMobile = document.getElementById("menuMobile");

botaoMenu.addEventListener("click", () => {

    if (menuMobile.style.display === "flex" && window.innerWidth < 668) {
        menuMobile.style.display = "none";

    } else {
        menuMobile.style.display = "flex";
    }
});


// menuHeader.innerHTML = `
//         <ul>
//             <li><a href="index.html">Home</a></li>
//             <li><a href="">Categorias</a></li> 
//             <li><a href="#" onclick="logout()">Sair</a></li>
//         </ul>
// `;