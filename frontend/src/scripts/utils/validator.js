export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validatePassword(password) {
  return password.length >= 6;
}

export function validateName(name) {
  const nome = name.trim();
  const nomeValido = /^[A-Za-z\s]+$/.test(nome);
  return nome.length >= 2 && nome.length <= 40 && nomeValido;
}

export function showError(message, condition) {
  if (message) {
    message.style.display = condition ? 'block' : 'none';
  }
}
