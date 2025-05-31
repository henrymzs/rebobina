const sequelize = require('../config/database');
const { Model, DataTypes } = require('sequelize');
const ListaFilmes = require("./ListaFilmes");

class Usuario extends Model{}

Usuario.init({
    nome: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    senha: { type: DataTypes.STRING, allowNull: false },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
    },
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    
});

Usuario.hasOne(ListaFilmes, { foreignKey: "usuarioId", onDelete: "CASCADE" });
ListaFilmes.belongsTo(Usuario, { foreignKey: "usuarioId", onDelete: "CASCADE" });

module.exports = Usuario;
