const ListaFilmesDAO = require("../models/DAO/ListaFilmesDAO");
const UsuarioDAO = require("../models/DAO/UsuarioDAO");
const UserService = require('../services/UserService');

const getProfile = async (req, res) => {
    const usuarioLogado = await UserService.getUsuarioLogado(req);
    if (!usuarioLogado) {
        return res.status(403).json({ error: 'Usuário não autenticado' });
    }

    try {
        const resultado = await ListaFilmesDAO.findByUserId(usuarioLogado.id);
        res.status(200).json({
            id: usuarioLogado.id,
            nome: usuarioLogado.nome,
            email: usuarioLogado.email,
            ListaFilmes: resultado || null
        })
    } catch (error) {
        console.error('Erro ao buscar o perfil do usuário', error);
        res.status(500).json({ error: 'Erro ao buscar perfil do usuário.' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const usuarioLogado = await UserService.getUsuarioLogado(req);
        if (!usuarioLogado || usuarioLogado.role !== 'admin') {
            return res.status(403).json({ erro: 'Acesso negado! Você precisa ser admin para acessar esta página.' });
        }

        const listaUsuarios = await UserService.getAllUsers();
        res.status(200).json(listaUsuarios);
    } catch (error) {
        console.error('Erro ao buscar lista de usuários:', error);
        res.status(500).json({ erro: 'Erro ao buscar usuários.' });
    }
}

module.exports = { getProfile, getAllUsers };