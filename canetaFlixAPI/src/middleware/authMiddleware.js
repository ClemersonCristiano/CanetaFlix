const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta"; //Pegando a chave do .env

// Middleware para verificar se o usuário está autenticado
function autenticarUsuario(req, res, next) {

    const token = req.header("Authorization"); // Pegando o token do header

    if (!token) {
        return res.status(401).json({ success: false, message: "Acesso negado. Token não fornecido." });
    }

    try {
        const tokenLimpo = token.replace("Bearer ", ""); // Remove "Bearer " se estiver presente
        const decoded = jwt.verify(tokenLimpo, JWT_SECRET); // Verifica o token
        req.user = decoded; // Armazena os dados do usuário na requisição
        next(); // Permite continuar para a rota protegida
    } catch (error) {
        return res.status(403).json({ success: false, message: "Token inválido." });
    }
}

module.exports = autenticarUsuario;