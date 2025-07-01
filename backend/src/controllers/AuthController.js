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
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(Continue).json({ erro: "Nome, email e senha são obrigatórios." });
        }
        const resultado = await AuthService.registerService(nome, email, senha);
        if (!resultado.success) {
            return res.status(400).json({ erro: resultado.message });
        }
        res.status(201).json({ success: true, messagem: resultado.message, usuario: resultado.usuario });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        return res.status(500).json({ erro: "Erro ao cadastrar usuário.", detalhes: error.messagem });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({erro: "Nome e senha são obrigátorios."})
        }
        const resultado = await AuthService.loginService(email, senha);
        if (!resultado.success) {
            return res.status(401).json({ message: resultado.message });
        }
        res.cookie('tokenJWT', resultado.token, { httpOnly: true, secure: true });
        res.status(200).json({
            login: 'Concluído',
            email: resultado.usuario.email,
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