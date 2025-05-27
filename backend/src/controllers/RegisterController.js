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
                return res.status(400).json({ erro: 'Nome já está em uso' });
            }

            if (findEmail) {
                console.log('Cancelado, e-mail duplicado. ');
                return res.status(400).json( { erro: 'E-mail já esta em uso. ' });
            }

            const newUser = await UsuarioDAO.create({ nome, email, senha })
            console.log(newUser);
            return res.status(201).json({ sucesso: true, mensagem: 'Conta criado com sucesso.' });
        } catch (error) {
            console.error('Erro ao registrar usuário', error);
            return res.status(500).json( { erro: error.mensagem || 'Erro ao cadastrar usuário' });
        }
    }
}

module.exports = new RegisterController();