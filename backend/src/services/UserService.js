const ListaFilmesDAO = require('../models/DAO/ListaFilmesDAO');
const ListasAcessadasDAO = require('../models/DAO/ListasAcessadasDAO');
const UsuarioDAO = require('../models/DAO/UsuarioDAO');

const deleteUserAccount = async (usuarioId) => {
    const listasDoUsuario = await ListaFilmesDAO.findByUserId(usuarioId);
    if (Array.isArray(listasDoUsuario) && listasDoUsuario.length > 0) {
        for (const lista of listasDoUsuario) {
            await ListaFilmesDAO.deleteLista(lista.id);
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
    const acessadoPor = await ListasAcessadasDAO.buscarAcessosPorLista(lista.id);
    return { sucesso: true, lista, acessadoPor };
}

const shareList = async (usuarioId) => {
  const lista = await ListaFilmesDAO.findByUserId(usuarioId);
  if (!lista || !lista.tokenCompartilhamento) {
    return {
      sucesso: false,
      mensagem: "Lista não encontrada ou sem token de compartilhamento."
    };
  }
  return { sucesso: true, lista };
};


module.exports = { updateNameList, searchUserList, deleteUserAccount, shareList };