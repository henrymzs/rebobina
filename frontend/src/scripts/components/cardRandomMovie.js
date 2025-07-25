export function renderModalCard(titulo) {
  const container = document.getElementById('randomMovieContainer');

  container.innerHTML = `
    <div class="link-card modal-card">
      <div class="card-thumb"></div>
      <div class="card-content">
        <div class="card-header">
          <h3 class="movie-title">${titulo}</h3>
          <div class="watch-on">
            <i class="fas fa-film"></i> Em Breve
          </div>
        </div>
        <a href="#" class="movie-link" target="_blank">Em Breve</a>
      </div>
    </div>
  `;
}
