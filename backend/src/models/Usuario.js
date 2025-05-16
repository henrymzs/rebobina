const db = require('../config/database');
const {  Model, DataTypes } = require('sequelize');

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
    sequelize: db.sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    
});

module.exports = Usuario;
