const ListasAcessadas = require('../ListasAcessadas');

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
}

module.exports = new ListasAcessadasDAO();
