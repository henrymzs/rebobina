function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function validatePassword(password) {
  return password.length >= 6;
}

function showError(message, condition) {
  if (message) {
    message.style.display = condition ? 'block' : 'none';
  }
}