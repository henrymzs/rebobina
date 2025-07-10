const ListaFilmesDAO = require('../models/DAO/ListaFilmesDAO');
const UsuarioDAO = require('../models/DAO/UsuarioDAO');
const { formatUsers } = require('../utils/FormatUser');

const fetchAllUsers = async () => {
  const usuarios = await UsuarioDAO.getAll();
  return formatUsers(usuarios);
};

const changeUserRole = async (usuarioId) => {
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

const updateNameList = async (usuarioId, nomeLista) => {
    if (!nomeLista || nomeLista.trim() === '') {
        return { sucesso: false, mensagem: "O nome da lista é obrigatório." };
    }
    return await ListaFilmesDAO.updateLista(usuarioId, nomeLista);
};

const searchUserList = async (usuarioId) => {
    const lista = await ListaFilmesDAO.findByUserId(usuarioId);
    if (!lista) {
        return { sucesso: false, mensagem: "Lista não encontrada para este usuário." };
    }
    return { sucesso: true, lista };
}

module.exports = { fetchAllUsers, changeUserRole, deleteUser, updateNameList, searchUserList };