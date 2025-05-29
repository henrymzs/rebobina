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
            return lista || null;
        } catch (error) {
            console.error('Erro ao buscar lista de filmes: ', error);
        }
    }

    async updateLista(usuarioId, nomeNovo) {
        let lista;
        try {
            lista = await ListaFilmes.findOne({ where: { usuarioId } });
            if (!lista) {
                return { sucesso: false, mensagem: 'Usuário não possui uma lista de filmes para editar.' };
            }
            lista.nomeLista = nomeNovo || lista.nomeLista;
            await lista.save(); 
            return { sucesso: true, lista };
        } catch (error) {
            console.error('Erro ao atualizar lista de filmes:', error);
            return { sucesso: false, mensagem: 'Erro ao atualizar lista de filmes.' };
        }
    }

    async deleteLista(usuarioId) {
        try {
            const lista = await ListaFilmes.findOne({ where: {usuarioId} });
            if (!lista) {
                return { sucesso: false, mensagem: 'Usuário não possui uma lista de filmes para excluir.' };
            }
            await lista.destroy();
            return { sucesso: true, mensagem: 'Lista excluida com sucesso!' };
        } catch (error) {
            console.error('Erro ao excluir lista de filmes:', error);
            return { sucesso: false, mensagem: 'Erro ao excluir lista de filmes.' };
        }
    }

    async findByToken(token) {
        try {
            const lista = await ListaFilmes.findOne({ where: { tokenCompartilhamento: token } });

            if (!lista) {
                return { sucesso: false, mensagem: 'Lista não encontrada.' };
            }

            return { sucesso: true, lista };
        } catch (error) {
            console.error('Erro ao buscar lista de filmes:', error);
            return { sucesso: false, mensagem: 'Erro ao buscar lista de filmes.' };
        }
    }

}


module.exports = new ListaFilmesDAO();