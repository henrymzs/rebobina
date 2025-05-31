const jwt = require("jsonwebtoken");
const UsuarioDAO = require("../models/DAO/UsuarioDAO");

const getUsuarioLogado = async (req) => {
    const token = req.cookies.tokenJWT;
    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, 'chave_secreta');
        return await UsuarioDAO.getById(decoded.id);
    } catch (error) {
        console.error('Erro ao verificar usuário logado');
        return null;
    }
};

module.exports = { getUsuarioLogado };