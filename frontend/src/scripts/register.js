document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const nameInput = document.getElementById('name');
  const emailErro = document.getElementById('email-error');
  const passwordErro = document.getElementById('password-error');
  const nameErro = document.getElementById('name-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const validEmail = validateEmail(emailInput.value);
    const validPassword = validatePassword(passwordInput.value);
    const validName = validateName(nameInput.value);

    showError(emailErro, !validEmail);
    showError(passwordErro, !validPassword);
    showError(nameErro, !validName);

    if (validEmail && validPassword) {
      form.submit(); 
    }
  });
});