const axios = require('axios');
const FilmeDAO = require('../models/DAO/FilmeDAO');
const ListaFilmesDAO = require('../models/DAO/ListaFilmesDAO');
require('dotenv').config();
const apiKey = process.env.API_KEY;

exports.adicionarFilme = async (req, res) => {
    try {
        const { titulo } = req.body;
        const usuarioId = req.id; 
        const lista = await ListaFilmesDAO.findByUserId(usuarioId);

        if (!lista || lista.usuarioId !== usuarioId) {
            console.log("Nenhuma lista foi encontrada para o usuário ID:", usuarioId);
            return res.status(400).json({ erro: "Usuário ainda não criou uma lista de filmes" });
        }

        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${titulo}`);
        const filmeTMDb = response.data.results[0]; 

        if (!filmeTMDb) {
            return res.status(404).json({ erro: "Filme não encontrado na API TMDb" });
        }
        const listaId = lista?.id;
        console.log("🔍 ID da lista extraído:", listaId);
        console.log("🔍 Tentando adicionar filme à lista ID:", listaId);
        console.log("🔍 Usuário autenticado:", usuarioId);
        try {
            const novoFilme = await FilmeDAO.create({
            id_tmdb: filmeTMDb.id, 
            titulo: filmeTMDb.title,
            listaId: listaId
            });
            res.status(201).json(novoFilme);
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    } catch (error) {
        res.status(500).json({ erro: "Erro ao adicionar filme" });
        console.error('erro', error);
        throw error;

    }
};

exports.editarFilme = async (req, res) => {
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

exports.excluirFilme = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await FilmeDAO.filmeDelete(id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).json({ erro: message || 'Erro ao excluir filme.' })
    }
};