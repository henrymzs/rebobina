const express = require('express');
const cors = require('cors');
require('dotenv').config();

const API = process.env.API;
const app = express();

app.use(express.json());
app.use(cors());

app.post('/search-movie', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        console.log('❌ Erro: Nome do filme não foi informado.');
        return res.status(400).json({ message: 'Nome do filme não informado' });
    }

    console.log(`✅ Requisição recebida: Buscando filme "${query}"`);

    try {
        const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${encodeURIComponent(query)}`;
        const response = await fetch(tmdbUrl);
        const data = await response.json();

        if (!data.results.length) {
            console.log(`⚠️ Filme "${query}" não encontrado.`);
            return res.status(404).json({ message: 'Filme não encontrado' });
        }

        console.log(`✅ Filme encontrado: "${data.results[0].title}"`);
        res.json(data.results[0]);
    } catch (error) {
        console.error('❌ Erro ao buscar filme:', error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

app.listen(3000, () => console.log('🚀 Backend rodando na porta 3000'));