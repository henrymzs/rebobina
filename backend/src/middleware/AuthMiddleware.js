const jwt = require('jsonwebtoken');
const UsuarioDAO = require('../models/DAO/UsuarioDAO');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies["tokenJWT"];
    if (!token) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await UsuarioDAO.getById(decoded.id);
        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.error("Erro ao verificar token:", error);
        return res.status(401).json({ erro: "Token inválido ou expirado." });
    }
};

