const db = require('../config/db');
const Sequelize = require('sequelize');

module.exports = db.define('User', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    city: Sequelize.STRING,
    username: Sequelize.STRING,
    password: 
    { type:Sequelize.STRING, 
      validate: {is:"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"}
    }
});
