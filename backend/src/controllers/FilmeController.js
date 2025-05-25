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

        if (!lista.sucesso) {
            return res.status(400).json({ erro: "Usuário ainda não criou uma lista de filmes" });
        }


        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${titulo}`);
        const filmeTMDb = response.data.results[0]; 

        if (!filmeTMDb) {
            return res.status(404).json({ erro: "Filme não encontrado na API TMDb" });
        }

        try {
            const novoFilme = await FilmeDAO.create({
            id_tmdb: filmeTMDb.id, 
            titulo: filmeTMDb.title,
            listaId: lista.lista.id
            });
            res.status(201).json(novoFilme);
        } catch (error) {
            res.status(404).json({ erro: error.message });
        }
    } catch (error) {
        res.status(500).json({ erro: "Erro ao adicionar filme" });
        console.error('erro', error);
    }
};