const app = require('./app');
const Usuario = require('./src/models/Usuario');
const ListaFilmes = require('./src/models/ListaFilmes');
const ListasAcessadas = require('./src/models/ListasAcessadas');
const Filme = require('./src/models/Filme')
const sequelize = require('./src/config/database');

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor escutando na porta ${PORT}`));

sequelize.sync()
    .then(() => console.log('Conexão com banco de dados estabelecida e sincronizada!'))
    .catch(err => console.error('Erro ao conectar no banco:', err));
