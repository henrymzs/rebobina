const API_URL = 'http://localhost:3000';

export async function registerUser(dados) {
  return fetch(`${API_URL}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  }).then(res => res.json());
}

export async function loginUser(dados) {
  return fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  }).then(res => res.json());
}

export async function profileUser(token) {
  return fetch(`${API_URL}/user/profile`, {
    method: 'GET',
     headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
  }).then(res => res.json());
}
