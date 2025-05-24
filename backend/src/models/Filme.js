const ListaFilmes = require('./ListaFilmes');
const { Model, DataTypes } = require('sequelize');
const db = require('../config/database');


class Filme extends Model {}

Filme.init({
    id_tmdb: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    titulo: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    listaId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'lista_filmes', key: 'id' } 
    }
}, {
    sequelize: db.sequelize,
    modelName: 'Filme',
    tableName: 'filmes'
});


module.exports = Filme;