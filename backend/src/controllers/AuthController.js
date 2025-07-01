const AuthService = require('../services/AuthService');
require('dotenv').config();

const deslogar = async (req, res) => {
    try {
        const usuarioLogado = await AuthService.getUsuarioLogado(req);
        if (!usuarioLogado) {
            return res.status(401).json({ error: 'Nenhum usuário logado' });
        }
        res.clearCookie('tokenJWT');
        res.status(200).json({ message: 'Usuário deslogado com sucesso! ', email: usuarioLogado.email });
    } catch (error) {
        console.error('Erro ao deslogar usuário: ', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ erro: "Nome, email e senha são obrigatórios." });
        }
        const result = await AuthService.registerService(name, email, password);
        if (!result.success) {
            return res.status(400).json({ erro: result.message });
        }
        res.status(201).json({ success: true, message: result.message, user: result.usuario });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        return res.status(500).json({ erro: "Erro ao cadastrar usuário.", details: error.message });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const resultado = await AuthService.loginService(email, senha);
        if (!resultado.success) {
            return res.status(401).json({ message: resultado.message });
        }
        res.cookie('tokenJWT', resultado.token, { httpOnly: true, secure: true });
        res.status(200).json({
            email: resultado.usuario.email,
            login: 'Concluído',
            token: resultado.token,
            lista: resultado.lista
        })
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({
            error: 'Erro ao fazer login. Tente novamente.',
            detalhes: error.message
        });
    }
}

module.exports = { deslogar, registerController, loginController };