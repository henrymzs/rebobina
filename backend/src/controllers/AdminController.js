const AdminService = require('../services/AdminService');

const getAllUsers = async (req, res) => {
    const usuario = req.usuario
    try {
        if (!usuario || usuario.role !== "admin") {
            return res.status(403).json({ erro: 'Acesso negado! Você precisa ser admin para acessar esta página.' });
        }
        const listaUsuarios = await AdminService.fetchAllUsers();
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
        const resultado = await AdminService.changeUserRole(id);
        if (!resultado.success) {
            return res.status(404).json({ message: resultado.message });
        }
        return res.status(200).json({ message: resultado.message });
    } catch (error) {
        console.error('Erro ao atualizar role do usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar role do usuário.' })
    }
};

const deleteUserAsAdmin = async (req, res) => {
    const usuario = req.usuario
    const { id } = req.params;
    try {
        if (!usuario || usuario.role !== "admin") {
            return res.status(403).json({ erro: 'Acesso negado! Você precisa ser admin para acessar esta página.' });
        }
        const resultado = await AdminService.deleteUserByAdmin(id);
        if (!resultado.success) {
            return res.status(404).json({ message: resultado.message });
        }
        return res.status(200).json({ message: resultado.message });
    } catch (error) {
        console.error('Erro ao excluir usuário: ', error);
        res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
};

module.exports = { getAllUsers, updateRole, deleteUserAsAdmin };