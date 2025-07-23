const API_URL = 'http://localhost:3000';

export async function loadMovies(token) {
    return fetch(`${API_URL}/user/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(res => res.json())
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        });
}

export async function postMovie(titulo, token) {
    return fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ titulo })
    })
        .then(res => res.json())
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        });
}

export async function deleteMovie(id, token) {
    return fetch(`${API_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(res => res.json())
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        });
}

export async function updateMovie(id, newTitle, token) {
    return fetch(`${API_URL}/movies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ titulo: newTitle })
    })
        .then(res => res.json())
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        });
}

