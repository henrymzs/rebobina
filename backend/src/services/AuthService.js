const jwt = require("jsonwebtoken");
const UsuarioDAO = require("../models/DAO/UsuarioDAO");
const ListaFilmesDAO = require("../models/DAO/ListaFilmesDAO");

const register = async (nome, email, senha) => {
    try {
        const findEmail = await UsuarioDAO.findOne({ email });
        if (findEmail) {
            return { success: false, message: 'Email já está em uso.' };
        }
        const newUser = await UsuarioDAO.create({ nome, email, senha });
        return { success: true, message: 'Conta criada com sucesso!', usuario: newUser }
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return { success: false, message: 'Erro ao cadastrar usuário', detalhes: error.message };
    }
};

const login = async (email, senha) => {
    const usuario = await UsuarioDAO.findOne({ email });
    if (!usuario) {
        return { success: false, message: 'Usuário não encontrado.' };
    }
    if (senha !== usuario.senha) {
        return { success: false, message: 'Senha incorreta.' };
    }
    const token = jwt.sign({ id: usuario.id }, 'chave_secreta', { expiresIn: "1d" });
    let listaExistente = await ListaFilmesDAO.findByUserId(usuario.id);
    if (!listaExistente) {
        listaExistente = await ListaFilmesDAO.create({ usuarioId: usuario.id, nomeLista: 'Minha Lista' });
    }
    return { success: true, token, usuario, lista: listaExistente };
};

const authenticateUser = async (req) => {
    const token = req.cookies.tokenJWT;
    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, 'chave_secreta');
        return await UsuarioDAO.getById(decoded.id);
    } catch (error) {
        console.error('Erro ao verificar usuário logado');
        return null;
    }
};

module.exports = { authenticateUser,register,login };