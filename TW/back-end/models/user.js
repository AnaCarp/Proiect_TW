const db = require('../config/db');
const Sequelize = require('sequelize');

module.exports = db.define('User', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    city: Sequelize.STRING,
    user: Sequelize.STRING,
    password: Sequelize.STRING,
});