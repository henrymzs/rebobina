const Filme = require('../Filme');

class FilmeDAO {
    async create({ id_tmdb, titulo, listaId }) {
        try {
            return await Filme.create({ id_tmdb, titulo, listaId });
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new Error(`O filme já está na lista! Filme ID: ${id_tmdb}`);
            }
            throw new Error('Erro ao adicionar filme.');
        }

    }

    async findAllByLista(listaId) {
        return await Filme.findAll({
            where: { listaId },
            attributes: ['id', 'id_tmdb', 'titulo', 'listaId', 'createdAt', 'updatedAt']
        });
    }

    async findById(id) {
        return await Filme.findOne({
            where: { id },
            attributes: ['id', 'id_tmdb', 'titulo', 'listaId', 'createdAt', 'updatedAt']
        });
    }

    async findByFilmeDuplicate(id_tmdb, listaId) {
        return await Filme.findOne({
            where: { id_tmdb, listaId },
            attributes: ['id', 'id_tmdb', 'titulo', 'listaId', 'createdAt', 'updatedAt']
        });
    }

    async update(id, dadosAtualizados) {
        try {
            const filme = await Filme.findByPk(id);
            if (!filme) {
                throw new Error('Filme não encontrado');
            }
            const tituloExistente = await Filme.findOne({
                where: {
                    titulo: dadosAtualizados.titulo,
                    listaId: filme.listaId
                }
            });
            if (tituloExistente) {
                throw new Error('Já existe um filme com esse título na lista!');
            }
            await filme.update(dadosAtualizados);
            return filme;
        } catch (error) {
            throw new Error(error.message || 'Erro ao atualizar o filme.');
        }
    }

    async deleteById(id) {
        try {             const filme = await Filme.findByPk(id);
            if (!filme) {
                throw new Error('Filme não encontrado');
            }
            await filme.destroy();
            return { sucesso: true, mensagem: 'Filme removido com sucesso!' };
        } catch (error) {
            throw new Error('Erro ao excluir filme.');
        }
    }
}

module.exports = new FilmeDAO();
