const app = require('./app');
const Usuario = require('./src/models/Usuario');

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor escutando na porta ${PORT}`));
