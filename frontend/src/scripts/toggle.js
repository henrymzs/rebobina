document.addEventListener('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('password');
  const eyePassword = document.getElementById('eye-lock');
  eyePassword.addEventListener('click', function () {
    const currentType = passwordInput.getAttribute('type');
    const type = currentType === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
  });
});
