const db = require('../config/database');
const {  Model, DataTypes } = require('sequelize');

class ListaFilmes extends Model {}

ListaFilmes.init({
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    modelName: 'listarFilmes',
    tableName: 'lista_filmes',
});

module.exports = ListaFilmes;