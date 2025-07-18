import { registerUser } from './registerUser.js';
import { validateName, validateEmail, validatePassword, showError } from "./validator.js"

export function initRegisterForm() {
    const form = document.getElementById('form');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const nameErro = document.getElementById('name-error');
    const emailErro = document.getElementById('email-error');
    const passwordErro = document.getElementById('password-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const validEmail = validateEmail(emailInput.value);
        const validPassword = validatePassword(passwordInput.value);
        const validName = validateName(nameInput.value);

        showError(emailErro, !validEmail);
        showError(passwordErro, !validPassword);
        showError(nameErro, !validName);

        if (validEmail && validPassword && validName) {
            registerUser(form);
        }
    });
}
