const db = require('../config/database');
const {  Model, DataTypes } = require('sequelize');

class User extends Model{}

User.init({
    nome: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    senha: { type: DataTypes.STRING, allowNull: false },
}, {
    sequelize: db.sequelize,
    modelName: 'User',
    tableName: 'Users'
});

module.exports = User;
