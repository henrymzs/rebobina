//require('dotenv').config();
//const {Sequelize} = require('sequelize');

//const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, //process.env.DB_PASSWORD, {
//    host: process.env.DB_HOST,
//    port: process.env.DB_PORT,
//    dialect: process.env.DB_DIALECT,
//});

//module.exports = sequelize;

require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});

module.exports = sequelize;
