const formLogin = document.getElementById("formLogin");
const btnLogout = document.getElementById("btnLogout");

async function Login() {

    const nome = document.getElementById('user').value;
    const pw = document.getElementById('pass').value;

    try {
        const response = await fetch('http://localhost:3000/api/usuario/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, pw })
        });

        const json = await response.json();
        
        if (!json.success) {
            alert(json.message); //impede login inválido
            return;
        }
        
        // salva o token se o login for bem-sucedido
        sessionStorage.setItem('token', json.token);
        sessionStorage.setItem('id_usuario', json.id_usuario);
        window.location.href = "home.html";
        
    } catch (error) {
        console.error("Erro ao fazer login:", error);
    }

}

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    Login();
});

// função de logout da sessão
function logout() {
    alert("Logout bem-sucedido");
    sessionStorage.clear(); // Remove todos os dados armazenados na sessão
    window.location.href = "login.html"; // Redireciona para a tela de login
}