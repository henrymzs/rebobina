const UsuarioDAO = require('../models/DAO/UsuarioDAO');

const getUsuarioLogado = async (req) => {
    if (!req.id) {
        return null;
    }

    console.log('Buscando usuário autenticado', req.id);
    return await UsuarioDAO.getById(req.id);
}

const getAllUsers = async () => {
    // Deve posteriormente haver filtros na busca de usuários, por isso separando essa função do database para maior flexibilidade
    return await UsuarioDAO.getAll();
}

module.exports = { getUsuarioLogado, getAllUsers };