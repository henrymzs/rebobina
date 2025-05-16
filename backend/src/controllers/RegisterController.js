const UsuarioDAO = require('../models/DAO/UsuarioDAO');

class RegisterController {
    async register(req, res) {
        try {
            const { nome, email, senha } = req.body;
            console.log('Dados recebidos: ', req.body);
            const findNome = await UsuarioDAO.findOne({ nome });
            const findEmail = await UsuarioDAO.findOne({ email });
        
            if (findNome) {
                console.log('Cancelado, nome duplicado. ');
                return res.status(400).send('Nome já está em uso');
            }

            if (findEmail) {
                console.log('Cancelado, e-mail duplicado. ');
                return res.status(400).send('E-mail já esta em uso. ');
            }

            const newUser = await UsuarioDAO.create({ nome, email, senha })
            console.log(newUser);
            return res.redirect('/');
        } catch (error) {
            console.error('Erro ao registrar usuário', error);
            return res.send('Erro ao registrar usuário');
        }
    }
}

module.exports = new RegisterController();