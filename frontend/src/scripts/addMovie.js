function addMovie() {
    const movieName = document.getElementById('movie-name').value.trim();
    const token = localStorage.getItem('authToken');

    if (!movieName) {
        alert("Você precisa preencher o nome do filme.");
        return;
    }

    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ titulo: movieName })
    })
        .then(response => response.json())
        .then(data => {
            if (data.titulo) {
                document.getElementById('addLinkForm').reset();
                document.getElementById('addLinkModal').style.display = 'none';
                renderMovieCard(data.titulo);
            } else {
                alert('Erro: título não encontrado');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor');
        });
}
