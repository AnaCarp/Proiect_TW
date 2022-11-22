const Sequelize = require("sequelize");
const config = require("./config");

const { database, host, user, password } = config.database;

const sequelize = new Sequelize(database, user, password, {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: true,
  },
});

module.exports = sequelize;
