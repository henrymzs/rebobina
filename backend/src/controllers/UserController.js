const ListaFilmesDAO = require("../models/DAO/ListaFilmesDAO");
const UserService = require('../services/UserService');

const profile = async (req, res) => {
    const usuario = req.usuario;
    try {
        const lista = await ListaFilmesDAO.findByUserId(usuario.id);
        return res.status(200).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            ListaFilmes: lista || null

        });
    } catch (error) {
        console.error("Erro ao buscar perfil do usuário", error);
        return res.status(500).json({ error: 'Erro ao buscar perfil do usuário.' });
    };
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
};

const updateRole = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const resultado = await UserService.updateRole(usuarioId);

        if (resultado.success) {
            return res.status(200).json({ message: resultado.message });
        }
        return res.status(404).json({ message: resultado.message });
    } catch (error) {
        console.error('Erro ao atualizar role do usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar role do usuário.' })
    }
};

const deleteUser = async (req, res) => {
    try {
        const usuarioLogado = await UserService.getUsuarioLogado(req);
        if (!usuarioLogado || usuarioLogado.role !== 'admin') {
            return res.status(403).json({ error: 'Apenas adminstradores podem utilizar essa funcionalidade.' });
        }
        const usuarioId = req.params.id;
        const resultado = await UserService.deleteUser(usuarioId);
        if (!resultado.success) {
            return res.status(404).json({ message: resultado.message });
        }
        return res.status(404).json({ message: resultado.message });
    } catch (error) {
        console.error('Erro ao excluir usuário: ', error);
        res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
};

module.exports = { profile, getAllUsers, updateRole, deleteUser };