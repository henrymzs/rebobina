import { renderModalCard } from '../components/cardRandomMovie.js';

export function openModalLink() {
    const modal = document.getElementById('addLinkModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (!modal || !openModalBtn || !closeModalBtn) return;

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

export function openModalCard() {
    const modal = document.getElementById('randomModal');
    const openBtn = document.getElementById('randomizeCardsBtn');
    const closeBtn = document.getElementById('closeRandomModalBtn');

    if (!modal || !openBtn || !closeBtn) {
        return;
    }

    openBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.link-card');
        const container = document.getElementById('randomMovieContainer');

        if (!cards.length) {
            alert('Lista vazia!');
            return;
        }

        if (cards.length < 3) {
            alert('Você precisa ter no minimo ter 3 links na sua lista para poder utilizar esta função.');
            return;
        }

        const sorteado = cards[Math.floor(Math.random() * cards.length)];
        const titulo = sorteado.querySelector('.movie-title')?.textContent;
        if (titulo) {
            container.innerHTML = '';
            renderModalCard(titulo);
            console.log(container.innerHTML);

            modal.style.display = 'flex';
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

