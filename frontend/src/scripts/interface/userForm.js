import { loginUser } from '../api/user.js';
import { registerUser } from '../registerUser.js';
import { validateEmail, validatePassword, showError } from '../utils/validator.js';

export function initLoginForm() {
    const form = document.getElementById('form');
    if (!form) return;

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailErro = document.getElementById('email-error');
    const passwordErro = document.getElementById('password-error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        const validEmail = validateEmail(email);
        const validPassword = validatePassword(password);

        showError(emailErro, !validEmail);
        showError(passwordErro, !validPassword);

        if (!validEmail || !validPassword) return;
        const dados = { email, senha: password };
        try {
            const data = await loginUser(dados);

            if (data.login === 'Concluído' && data.token) {
                localStorage.setItem('authToken', data.token);
                alert('Login realizado com sucesso!');
                form.reset();
                window.location.href = '/frontend/src/templates/main.html';
            } else {
                const msg = data.messagem || data.message || data.erro || "Erro desconhecido";
                alert("Erro ao realizar login: " + msg);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Ocorreu um erro no servidor');
        }
    });
}

export function initRegisterForm() {
    const form = document.getElementById('form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameErro = document.getElementById('name-error');
    const emailErro = document.getElementById('email-error');
    const passwordErro = document.getElementById('password-error');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        const validName = validateName(nome);
        const validEmail = validateEmail(email);
        const validPassword = validatePassword(password);

        showError(nameErro, !validName);
        showError(emailErro, !validEmail);
        showError(passwordErro, !validPassword);

        if (!validEmail || !validPassword || !validName) return;
        const dados = { nome, email, senha: password };
        try {
            const data = await registerUser(dados);

            if (data.success) {
                alert('Cadastro realizado com sucesso!');
                form.reset();
                window.location.href = 'src/templates/login.html';
            } else {
                const msg = data.messagem || data.message || data.erro || "Erro desconhecido";
                alert("Erro ao cadastrar: " + msg);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro no servidor');
        }
    });
}
