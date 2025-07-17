function loginUser() {
    const form = document.getElementById('form');
    const email = form.email.value;
    const senha = form.password.value;

    const dados = {
        email: email,
        senha: senha
    };

    fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta do backend:", data);
            if (data.login === 'Concluído' && data.token) {
                localStorage.setItem('authToken', data.token);
                alert('Login realizado com sucesso!');
                form.reset();
                window.location.href = '/frontend/src/templates/main.html';
            } else {
                const msg = data.messagem || data.message || data.erro || "Erro desconhecido";
                alert("Erro ao realizar login: " + msg);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro no servidor');
        });
}
