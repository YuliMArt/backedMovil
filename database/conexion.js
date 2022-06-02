const { Sequelize } = require('sequelize');
const db = new Sequelize('carsrtw', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging:false
}); // Example for sqlite

module.exports = db;