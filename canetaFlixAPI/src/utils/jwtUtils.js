require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Pegando a chave secreta do .env
function gerarToken(usuario) {
    return jwt.sign(
        { id: usuario.id, email: usuario.email }, // Payload do JWT (dados do usuário)
        JWT_SECRET,  // Assina o token com a chave secreta
        { expiresIn: '1h' } // Tempo de expiração do token (1 hora)
    );
}

module.exports = { gerarToken };