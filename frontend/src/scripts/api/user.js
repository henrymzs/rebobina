const API_URL = 'http://localhost:3000';

export function registerUser(dados) {
  return fetch(`${API_URL}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  }).then(res => res.json());
}

export function loginUser(dados) {
  return fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  }).then(res => res.json());
}
