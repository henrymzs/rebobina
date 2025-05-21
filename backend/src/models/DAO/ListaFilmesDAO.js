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

    async updateLista(usuarioId, nomeNovo) {
        let lista;
        try {
            lista = await ListaFilmes.findOne({ where: { usuarioId } });
            if (!lista) {
                return { sucesso: false, mensagem: "Usuário não possui uma lista de filmes para editar." };
            }
            lista.nomeLista = nomeNovo || lista.nomeLista;
            await lista.save(); 
            return { sucesso: true, lista };
        } catch (error) {
            console.error("Erro ao atualizar lista de filmes:", error);
            return { sucesso: false, mensagem: "Erro ao atualizar lista de filmes." };
        }
    }
}


module.exports = new ListaFilmesDAO();