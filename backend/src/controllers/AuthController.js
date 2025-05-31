const AuthService = require('../services/AuthService');

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

module.exports = { deslogar };