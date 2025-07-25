export function requireAuth(redirectTo = '../templates/login.html') {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = redirectTo;
    }
}

export function logoutUser() {
    const btnLogout = document.getElementById('logoutBtnFooter');

    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('authToken');

        alert('Você saiu da sua conta!');
        window.location.href = '../templates/login.html';
    });
}

export function settingsUser() {
    const btnSettings = document.getElementById('accountSettingsBtn');
    btnSettings.addEventListener('click', () => {
        window.location.href = '../templates/settings.html';
    });
}

export function backSettings() {
    const backButton = document.getElementById('backBtn');
    backButton.addEventListener('click', () => {
        history.back();
    });

}



