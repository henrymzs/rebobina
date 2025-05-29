const jwt = require('jsonwebtoken');
const UsuarioDAO = require('../models/DAO/UsuarioDAO');
const ListaFilmesDAO = require('../models/DAO/ListaFilmesDAO');
require('dotenv').config();

class LoginController {
    async login(req, res) {
        try {
            const {  email, senha } = req.body;
            console.log('Dados recebidos', req.body);

            const usuario = await UsuarioDAO.findOne({ email });

            if (!usuario || senha !== usuario.senha) {
                console.log('Usuário ou senha inválidos. ');
                return res.status(200).render('login', { message: 'Usuário ou senha inválidos ' });
            }

            const token = jwt.sign({ id: usuario.id }, 'chave_secreta', { expiresIn: '1d' });
            res.cookie('tokenJWT', token, { httpOnly: true, secure: true });
            console.log('Token gerado:', token);
            
            let listaExistente = await ListaFilmesDAO.findByUserId(usuario.id);
            if (!listaExistente) {
                listaExistente = await ListaFilmesDAO.create({ usuarioId: usuario.id, nomeLista: 'Minha Lista' });
            } else {
                console.log('Usuário já possui uma lista, carregando dados:', listaExistente);
            }
            console.log('Login bem-sucedido');
            res.status(200).json({ 
                email: email,
                login: 'Concluído',
                token: token,
                lista: listaExistente
            });
        } catch (error) {
            console.error('Erro ao fazer login', error);
            return res.status(500).json({
                error: 'Erro ao fazer login. Tente novamente.',
                detalhes: error.message
            });
        }
    }
}

module.exports = new LoginController();
