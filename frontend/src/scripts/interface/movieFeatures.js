import { postMovie, deleteMovie, updateMovie, loadMovies, tokenListMovies } from '../api/movie.js';
import { renderMovieCard, showEmptyMessage } from '../components/card.js';

export function initAddMovie() {
    const addBtn = document.querySelector('.submit-btn');
    const form = document.getElementById('addLinkForm');
    const modal = document.getElementById('addLinkModal');

    if (!addBtn || !form || !modal) return;

    addBtn.addEventListener('click', async () => {
        const movieName = document.getElementById('movie-name').value.trim();
        const token = localStorage.getItem('authToken');

        if (!movieName) {
            alert("Você precisa preencher o nome do filme.");
            return;
        }

        const data = await postMovie(movieName, token);

        if (data?.titulo && data?.id) {
            form.reset();
            modal.style.display = 'none';
            renderMovieCard(data.titulo, data.id);
        } else {
            const msg = data.erro || data.message || "Erro ao adicionar filme.";
            alert(msg);
        }
    });
}

export function initDeleteMovie() {
    const token = localStorage.getItem('authToken');
    const container = document.getElementById('container-links');
    if (!container || !token) return;

    container.addEventListener('click', async (e) => {
        const btn = e.target.closest('.delete-btn');
        if (!btn) return;

        const card = btn.closest('.link-card');
        const titulo = card?.querySelector('.movie-title')?.textContent;
        const id = card?.dataset.movieId;
        if (!titulo || !id) return;

        const confirmDelete = confirm(`Tem certeza que deseja deletar "${titulo}"?`);
        if (!confirmDelete) return;

        try {
            const result = await deleteMovie(id, token);
            if (result?.sucesso) {
                card.remove();
                alert(result.mensagem || 'Filme removido com sucesso!');
            } else {
                alert(result.mensagem || 'Erro ao remover filme.');
            }
        } catch (error) {
            console.error('Erro ao deletar:', error);
            alert('Erro de conexão com o servidor');
        }
    });
}

export function initEditMovie() {
    const token = localStorage.getItem('authToken');
    const container = document.getElementById('container-links');
    if (!container || !token) return;

    container.addEventListener('click', async (e) => {
        const btn = e.target.closest('.edit-btn');
        if (!btn) return;

        const card = btn.closest('.link-card');
        const titleElement = card?.querySelector('.movie-title');
        const oldTitle = titleElement?.textContent;
        const id = card.dataset.movieId;

        const newTitle = prompt(`Editar título do filme:`, oldTitle);
        if (!id || !newTitle || newTitle.trim() === '' || newTitle === oldTitle) return;

        try {
            const result = await updateMovie(id, newTitle.trim(), token);

            if (result?.titulo) {
                titleElement.textContent = result.titulo;
                alert('Título atualizado com sucesso!');
            } else {
                alert(result?.mensagem || 'Erro ao editar o título.');
            }
        } catch (error) {
            console.error('Erro ao editar o filme:', error);
            alert('Erro ao conectar com o servidor.');
        }
    });
}

export async function loadUserMovies() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return;
    }

    try {
        const response = await loadMovies(token);
        const filmes = response.filmes;
        if ((!Array.isArray(filmes))) {
            console.error('Resposta Inesperada:', response);
            return;
        }
        if (filmes.length === 0) {
            showEmptyMessage();
            return;
        }
        for (const filme of filmes) {
            renderMovieCard(filme.titulo, filme.id);
        }
    } catch (error) {
        console.error('Erro ao carregar lista:', error);
        alert('Não foi possível carregar seus filmes.');
    }
}

export async function fillUserTokenList() {
    try {
        const token = localStorage.getItem('authToken');
        const dados = await tokenListMovies(token);
        const inputToken = document.getElementById('tokenList');
        inputToken.value = dados.link || '';
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
    }
}


