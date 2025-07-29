const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const UsuarioDAO = require("../models/DAO/UsuarioDAO");
const ListaFilmesDAO = require("../models/DAO/ListaFilmesDAO");
const { formatUser } = require("../utils/FormatUser");

const register = async (nome, email, senha) => {
    try {
        const findEmail = await UsuarioDAO.findOne({ email });
        if (findEmail) {
            return { success: false, message: 'Email já está em uso.' };
        }
        const hashedPassword = await bcrypt.hash(senha,10);
        const newUser = await UsuarioDAO.create({ nome, email, senha: hashedPassword });
        const usuarioFormatado = formatUser(newUser.get({ plain: true }));
        return { success: true, message: 'Conta criada com sucesso!', usuario: usuarioFormatado };
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
    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
    if (!isPasswordValid) {
        return { success: false, message: 'Senha Incorreta.' }
    }
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    let listaExistente = await ListaFilmesDAO.findByUserId(usuario.id);
    if (!listaExistente) {
        listaExistente = await ListaFilmesDAO.create({ usuarioId: usuario.id, nomeLista: 'Minha Lista' });
    }
    return { success: true, token, usuario: formatUser(usuario) };
};

const authenticateUser = async (req) => {
    const token = req.cookies.tokenJWT;
    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return await UsuarioDAO.getById(decoded.id);
    } catch (error) {
        console.error('Erro ao verificar usuário logado');
        return null;
    }
};

module.exports = { authenticateUser, register, login };
