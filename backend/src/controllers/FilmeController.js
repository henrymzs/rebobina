const FilmeDAO = require('../models/DAO/FilmeDAO');
const FilmeSerivce = require('../services/FilmeService');

const addMovie = async (req, res) => {
    try {
        const { titulo } = req.body;
        const usuarioId = req.usuario.id;
        if (!titulo) {
            return res.status(400).json({ erro: "Nome do filme é obrigatório para busca." });
        }
        const resultado = await FilmeSerivce.addMovieList(titulo, usuarioId);
        if (!resultado.success) {
            return res.status(404).json({ erro: resultado.message });
        }
        return res.status(201).json(resultado.filme);
    } catch (error) {
        console.error('Erro ao adicionar filme:', error);
        return res.status(500).json({ erro: "Erro interno ao adicionar filme." });
    }
};

const editMovie = async (req, res) => {
    try {
        const { titulo } = req.body
        const { id } = req.params;
        const usuarioId = req.usuario.id;
        if (!titulo) {
            return res.status(400).json({ erro: "Título é obrigatório para edição." });
        }
        const resultado = await FilmeSerivce.editMovieList(titulo, id, usuarioId);
        if (!resultado.success) {
            return res.status(404).json({ erro: resultado.message });
        }
        return res.status(200).json(resultado.filmeAtualizado);
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

module.exports = { addMovie, editMovie, excluirFilme };