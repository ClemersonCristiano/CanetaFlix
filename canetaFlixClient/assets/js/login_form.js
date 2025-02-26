const formLogin = document.getElementById("formLogin");

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const usuario = document.getElementById('user').value;
    const pw = document.getElementById('pass').value;

    try {
        const response = await fetch('http://localhost:3000/api/usuario/login', {
            method: 'POST', // 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, pw })
        });

        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.token); // Salva o token JWT no localStorage
            console.log("Token JWT recebido:", json.token);
            window.location.href = "home.html"; // Redireciona para home
        } else {
            alert(json.message); // Exibe erro ao usuário
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
    }
});
