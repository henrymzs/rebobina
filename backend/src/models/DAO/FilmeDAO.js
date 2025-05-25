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
        return await Filme.findAll({ where: { listaId } });
    }
}

module.exports = new FilmeDAO();