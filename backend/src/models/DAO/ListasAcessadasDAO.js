const ListasAcessadas = require('../ListasAcessadas');
const ListaFilmes = require('../ListaFilmes')

class ListasAcessadasDAO {
    async registrarAcesso(usuarioId, listaId) {
        try {
            await ListasAcessadas.create({ usuarioId, listaId });
        } catch (error) {
            console.error("Erro ao registrar acesso à lista:", error);
        }
    }

    async buscarAcessosPorLista(listaId) {
        try {
            return await ListasAcessadas.findAll({
                where: { listaId },
                attributes: ['usuarioId', 'data_acesso'],
                raw: true
            });
        } catch (error) {
            console.error("Erro ao buscar acessos à lista:", error);
            return [];
        }
    }

    async excluirAcessosPorLista(usuarioId) {
    try {
        const lista = await ListaFilmes.findOne({ where: { usuarioId } });

        if (!lista) return { sucesso: false, mensagem: "Lista não encontrada." };

        await ListasAcessadas.destroy({ where: { listaId: lista.id } });
        return { sucesso: true };
    } catch (error) {
        console.error("Erro ao excluir acessos à lista:", error);
        return { sucesso: false, mensagem: "Erro ao excluir acessos." };
    }
}
}

module.exports = new ListasAcessadasDAO();
