let botaoMenu = document.getElementById("botaoMenuMobile");
let menuMobile = document.getElementById("menuMobile");
let ativado = false;

botaoMenu.addEventListener("click", () => {
    if (menuMobile.style.display === "flex" && window.innerWidth < 668) {
        menuMobile.style.display = "none";
    } else {
        menuMobile.style.display = "flex";
    }
});

// Adicionando o evento de redimensionamento para ocultar o menu mobile em telas maiores
window.addEventListener("resize", () => {
    if (window.innerWidth >= 668) {
        menuMobile.style.display = "none";
    }
});
