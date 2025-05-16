const User = require('../Usuario');

class UsuarioDAO {
    async create({ nome, email, senha }) {
        let newUser;
        try {
            newUser = await User.create({ nome, email, senha});
        } catch (error) {
            console.error('Erro ao criar usuário: ', error);
        } finally {
            return newUser;
        }
    }

    async getAll() {
        let users;
        try {
            users = await User.findAll();
        } catch (error) {
            console.error('Erro ao buscar usuários: ', error);
        } finally {
            return users;
        }
    }

    async getById(userId) {
        let user;
        try {
            user = await User.findByPk(userId);
        } catch (error) {
            console.error('Erro ao buscar usuário por ID: ', error);
        } finally {
            return user;
        }
    }

    async update(userId, userUpdate) {
        let user;
        try {
            user = await User.findByPk(userId);
            if (user) {
                user.nome = userUpdate.nome || user.nome;
                user.email = userUpdate.email || user.email;
                user.senha = userUpdate.senha || user.senha;
                await user.save();
            } else {
                console.log('Usuário não encontrado para atualizações. ');
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário: ', error);
        } finally {
            return user;
        }
    }

    async delete(userId) {
        let userDelete = false;
        try {
            const user = await User.findByPk(userId);
            if (user) {
                await user.destroy();
                userDelete = true;
            } else {
                console.error('Usuário não encontrado para exclusão. ');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário: ', error);
        } finally {
            return userDelete;
        }
    }

    async findOne(query) {
    try {
        return await User.findOne({ where: query });
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw new Error('Erro ao buscar usuário');
    }
}

}

module.exports = new UsuarioDAO();