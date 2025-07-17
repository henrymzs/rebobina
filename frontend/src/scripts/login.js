document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailErro = document.getElementById('email-error');
  const passwordErro = document.getElementById('password-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const validEmail = validateEmail(emailInput.value);
    const validPassword = validatePassword(passwordInput.value);

    showError(emailErro, !validEmail);
    showError(passwordErro, !validPassword);

    if (validEmail && validPassword) {
        loginUser();
    }
  });
});
