export function copyLinkToken() {
    document.getElementById('copyLinkBtn').addEventListener('click', () => {
        const linkInput = document.getElementById('tokenList');
        linkInput.select();
        document.execCommand('copy');
        alert('Link copiado com sucesso!');
    });

}

