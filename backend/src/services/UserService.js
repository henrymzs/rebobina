const ListaFilmesDAO = require('../models/DAO/ListaFilmesDAO');
const UsuarioDAO = require('../models/DAO/UsuarioDAO');

const getUsuarioLogado = async (req) => {
    if (!req.id) {
        return null;
    }

    console.log('Buscando usuário autenticado', req.id);
    return await UsuarioDAO.getById(req.id);
};

const getAllUsers = async () => {
    // Deve posteriormente haver filtros na busca de usuários, por isso separando essa função do database para maior flexibilidade
    return await UsuarioDAO.getAll();
};

const updateRole = async (usuarioId) => {
    console.log("Atualizando role do usuário ID:", usuarioId);
    const usuario = await UsuarioDAO.getById(usuarioId);
    if (!usuario) {
        return { success: false, message: 'Usuário não encontrado' };
    }

    usuario.role = usuario.role === "admin" ? "user" : "admin";
    await usuario.save();
    return { success: true, message: `Role do usuário alterada para ${usuario.role}.` };
};

const deleteUser = async (usuarioId) => {
    const listaUsuarios = await ListaFilmesDAO.findByUserId(usuarioId);
    if (listaUsuarios && listaUsuarios > 0) {
        for (const lista of listaUsuarios) {
            await ListaFilmesDAO.deleteLista(usuarioId);            
        }
    }
    await UsuarioDAO.delete(usuarioId);
    return { success: true, message: 'Usuário excluído com sucesso.' };
};
module.exports = { getUsuarioLogado, getAllUsers, updateRole, deleteUser };