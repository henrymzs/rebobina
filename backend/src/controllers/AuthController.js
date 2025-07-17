const AuthService = require('../services/AuthService');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: "Nome, email e senha são obrigatórios." });
        }
        const resultado = await AuthService.register(nome, email, senha);
        if (!resultado.success) {
            return res.status(400).json({ erro: resultado.message });
        }
        res.status(201).json({ success: true, message: resultado.message, usuario: resultado.usuario });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        return res.status(500).json({ erro: "Erro ao cadastrar usuário.", detalhes: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({erro: "Nome e senha são obrigátorios."})
        }
        const resultado = await AuthService.login(email, senha);
        if (!resultado.success) {
            return res.status(401).json({ message: resultado.message });
        }
        res.cookie('tokenJWT', resultado.token, { httpOnly: true, secure: true });
        res.status(200).json({
            login: 'Concluído',
            email: resultado.usuario.email,
            token: resultado.token,
        })
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({
            error: 'Erro ao fazer login. Tente novamente.',
            detalhes: error.message
        });
    }
}

const logout = async (req, res) => {
    try {
        const usuario = req.usuario;
        res.clearCookie('tokenJWT');
        res.status(200).json({ message: 'Usuário deslogado com sucesso! ', email: usuario.email });
    } catch (error) {
        console.error('Erro ao deslogar usuário: ', error);
        res.status(500).json({ error: 'Erro interno no servidor.', detalhes: error.message });
    }
};

module.exports = { register,login,logout };
