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

const updateRole = async (usuarioId, novoRole) => {
    console.log("🔄 Atualizando role do usuário ID:", usuarioId);


    const usuario = await UsuarioDAO.getById(usuarioId);
    if (!usuario) {
        return { success: false, message: 'Usuário não encontrado' };
    }

    usuario.role = usuario.role === "admin" ? "user" : "admin";
    await usuario.save();
    return { success: true, message: `Role do usuário alterada para ${usuario.role}.` };
};

module.exports = { getUsuarioLogado, getAllUsers, updateRole };