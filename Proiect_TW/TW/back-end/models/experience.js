const db = require('../config/db');
const Sequelize = require('sequelize');

module.exports = db.define('Experience', {
    author: { type: Sequelize.STRING, allowNull: false },
    startPoint: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    endPoint: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    vehicleType: { type: Sequelize.STRING, allowNull: false },
    departureHour: { type: Sequelize.STRING, allowNull: false },
    duration: { type: Sequelize.INTEGER, allowNull: false },
    agglomeration: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ["Low", "Medium", "High"],
    },
    observations: { type: Sequelize.STRING, allowNull: false },
    satisfactionLevel: { type: Sequelize.INTEGER, allowNull: false }
});