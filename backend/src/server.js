const app = require('./app.js');
const Usuario = require('./models/Usuario.js');
const ListaFilmes = require('./models/ListaFilmes.js');
const ListasAcessadas = require('./models/ListasAcessadas.js');
const Filme = require('./models/Filme.js')
const sequelize = require('./config/database.js');

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor escutando na porta ${PORT}`));

sequelize.sync()
    .then(() => console.log('Conexão com banco de dados estabelecida e sincronizada!'))
    .catch(err => console.error('Erro ao conectar no banco:', err));
