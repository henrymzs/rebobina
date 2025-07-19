export function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyePassword = document.getElementById('eye-lock');

    eyePassword.addEventListener('click', () => {
        const currentType = passwordInput.getAttribute('type');
        const newType = currentType === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', newType);
    });
}
