const db = require('../config/database');
const {  Model, DataTypes } = require('sequelize');
const Filme = require('./Filme');

class ListaFilmes extends Model {}

ListaFilmes.init({
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'usuarios', key: 'id' }
    },
    nomeLista: { type: DataTypes.STRING, allowNull: false },
    tokenCompartilhamento: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => Math.random().toString(36).substring(2, 12)
    }
}, {
    sequelize: db.sequelize,
    modelName: 'ListaFilmes',
    tableName: 'lista_filmes',
});

Filme.belongsTo(ListaFilmes, { foreignKey: 'listaId' });
ListaFilmes.hasMany(Filme, { foreignKey: 'listaId', onDelete: 'CASCADE' });

module.exports = ListaFilmes;