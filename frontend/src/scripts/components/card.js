export function renderMovieCard(titulo, id) {
  const container = document.getElementById('container-links');

  const card = document.createElement('section');
  card.className = 'link-card';
  card.dataset.movieId = id;

  card.innerHTML = `
    <div class="card-thumb"></div>
    <div class="card-content">
      <div class="card-header">
        <h3 class="movie-title">${titulo}</h3>
        <div class="watch-on">
          <i class="fas fa-film"></i> Em Breve
        </div>
      </div>
      <a href="#" class="movie-link" target="_blank">
        Em Breve
      </a>
    </div>
    <div class="card-actions">
      <button class="action-btn edit-btn">
        <i class="fas fa-pencil-alt"></i>
      </button>
      <button class="action-btn delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;

  container.appendChild(card);
}
