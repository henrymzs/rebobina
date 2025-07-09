const ListaFilmesDAO = require('../models/DAO/ListaFilmesDAO');
const FilmeDAO = require('../models/DAO/FilmeDAO');
const axios = require('axios');
require('dotenv').config();
const apiKey = process.env.API_KEY;


const addMovieList = async (titulo, usuarioId) => {
    try {
        const lista = await ListaFilmesDAO.findByUserId(usuarioId);
        if (!lista) {
            return { success: false, message: "Lista do usuário não encontrada" };
        }
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${titulo}`);
        const filmeTMDb = response.data.results[0];
        if (!filmeTMDb) {
            return { success: false, message: "Filme não encontrado na API TMDb" };
        }
        const novoFilme = await FilmeDAO.create({
            id_tmdb: filmeTMDb.id,
            titulo: filmeTMDb.title,
            listaId: lista.id
        });
        return { success: true, filme: novoFilme };
    } catch (error) {
        console.error('Erro ao adicionar filme:', error);
        return { success: false, message: 'Erro ao adicionar filme', detalhes: error.message };
    }
}

const editMovieList = async (titulo, id, usuarioId) => {
    try {
        const filme = await FilmeDAO.findById(id);
        if (!filme) {
            return { success: false, message: "Filme não encontrado." };
        }
        const listaDoUsuario = await ListaFilmesDAO.findByUserId(usuarioId);
        if (!listaDoUsuario || filme.listaId !== listaDoUsuario.id) {
            return { success: false, message: "Você não tem permissão para editar este filme." };
        }
        const filmeAtualizado = await FilmeDAO.update(id, { titulo });
        return { success: true, filmeAtualizado };
    } catch (error) {
        console.error('Erro ao atualizar o nome do filme:', error);
        return { success: false, message: 'Erro ao atualizar o nome do filme', detalhes: error.message };
    }
};
module.exports = { addMovieList, editMovieList };