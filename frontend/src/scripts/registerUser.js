export function registerUser(form) {
    const nome = form.name.value;
    const email = form.email.value;
    const senha = form.password.value;

    const dados = { nome, email, senha };

    fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Cadastro realizado com sucesso!');
                form.reset();
                window.location.href = 'src/templates/login.html';
            } else {
                const msg = data.messagem || data.message || data.erro || "Erro desconhecido";
                alert("Erro ao cadastrar: " + msg);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro no servidor');
        });
}
