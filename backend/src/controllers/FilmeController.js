const FilmeDAO = require('../models/DAO/FilmeDAO');
const FilmeSerivce = require('../services/FilmeService');

const adicionarFilme = async (req, res) => {
    try {
        const { titulo } = req.body;
        const usuarioId = req.usuario.id;
        if (!titulo) {
            return res.status(400).json({ erro: "Nome do filme é obrigatório para busca." });
        }
        const resultado = await FilmeSerivce.adicionarFilme(titulo, usuarioId);
        if (!resultado.success) {
            return res.status(404).json({ erro: resultado.message });
        }
        return res.status(201).json(resultado.filme);
    } catch (error) {
        console.error('Erro ao adicionar filme:', error);
        return res.status(500).json({ erro: "Erro interno ao adicionar filme." });
    }
};

const editarFilme = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo } = req.body;
        if (!titulo) {
            return res.status(400).json({ erro: 'Título é obrigatório para edição.' });
        }
        const filmesAtualizado = await FilmeDAO.update(id, { titulo });
        res.status(200).json(filmesAtualizado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

const excluirFilme = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await FilmeDAO.filmeDelete(id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).json({ erro: message || 'Erro ao excluir filme.' })
    }
};

module.exports = { adicionarFilme, editarFilme, excluirFilme };