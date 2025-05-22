const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');

class ListasAcessadas extends Model {}

ListasAcessadas.init({
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onDelete: 'CASCADE'
    },
    listaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'lista_filmes', key: 'id'},
        onDelete: 'CASCADE'
    },
    data_acesso: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize: db.sequelize,
    modelName: 'ListasAcessadas',
    tableName: 'listas_acessadas'
});

module.exports = ListasAcessadas;