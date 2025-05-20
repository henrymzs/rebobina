const ListaFilmes = require('../ListaFilmes');

class ListaFilmesDAO {
    async create({ usuarioId, nomeLista }) {
        let novaLista;
        try {
            novaLista = await ListaFilmes.create({ usuarioId, nomeLista });
        } catch (error) {
            console.error('Erro ao criar lista de filmes', error);
        } finally {
            return novaLista;
        }
    }

    async findByUserId(usuarioId) {
        try {
            const lista = await ListaFilmes.findOne({ where: { usuarioId } });
            if (!lista) {
                return { sucesso: false, mensagem: 'Usuário ainda não criou sua lista.' };
            }
            return { sucesso: true, lista };
        } catch (error) {
            console.error('Erro ao buscar lista de filmes: ', error);
            return { sucesso: false, mensagem: 'Erro ao buscar lista.'}
        }
    }
}


module.exports = new ListaFilmesDAO();