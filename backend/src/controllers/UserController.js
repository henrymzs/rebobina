const ListaFilmesDAO = require("../models/DAO/ListaFilmesDAO");
const UserService = require('../services/UserService');

const profile = async (req, res) => {
    const usuario = req.usuario;
    try {
        return res.status(200).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        });
    } catch (error) {
        console.error("Erro ao buscar perfil do usuário", error);
        return res.status(500).json({ error: 'Erro ao buscar perfil do usuário.' });
    };
};

const userList = async (req, res) => {
    const usuario = req.usuario;
    try {
        const resultado = await UserService.searchUserList(usuario.id);
        if (!resultado.sucesso) {
           return res.status(404).json({ error: mensagem });
        }
        return res.status(200).json({ ListaFilmes: resultado.lista });
    } catch (error) {
        console.error("Erro ao buscar lista do usuário", error);
        return res.status(500).json({ error: 'Erro ao buscar lista do usuário.' });
    }
}

const nameList = async (req, res) => {
    const usuario = req.usuario;
    const { nomeLista } = req.body;
    try {
        const resultado = await UserService.updateNameList(usuario.id, nomeLista)
        if (!resultado.sucesso) {
            return res.status(404).json({ error: resultado.mensagem })
        }
        res.status(200).json({ message: "Nome da lista atualizada com sucesso!", lista: resultado.lista });
    } catch (error) {
        console.error('Erro na rota de atualização da lista:', error);
        res.status(500).json({ error: 'Erro ao atualizar lista.' });
    }
}

const getAllUsers = async (req, res) => {
    const usuario = req.usuario
    try {
        if (!usuario || usuario.role !== "admin") {
            return res.status(403).json({ erro: 'Acesso negado! Você precisa ser admin para acessar esta página.' });
        }
        const listaUsuarios = await UserService.fetchAllUsers();
        res.status(200).json(listaUsuarios);
    } catch (error) {
         console.error('Erro ao buscar lista de usuários:', error);
        res.status(500).json({ erro: 'Erro ao buscar usuários.' });
    }
};

const updateRole = async (req, res) => {
    const usuario = req.usuario
    const { id } = req.params;
    try {
        if (!usuario || usuario.role !== "admin") {
            return res.status(403).json({ erro: 'Acesso negado! Você precisa ser admin para acessar esta página.' });
        }
        const resultado = await UserService.changeUserRole(id);
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
    const usuario = req.usuario
    const { id } = req.params;
    try {
        if (!usuario || usuario.role !== "admin") {
            return res.status(403).json({ erro: 'Acesso negado! Você precisa ser admin para acessar esta página.' });
        }
        const resultado = await UserService.deleteUser(id);
        if (!resultado.success) {
            return res.status(404).json({ message: resultado.message });
        }
        return res.status(200).json({ message: resultado.message });
    } catch (error) {
        console.error('Erro ao excluir usuário: ', error);
        res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
};

module.exports = { profile, getAllUsers, updateRole, deleteUser, userList, nameList };