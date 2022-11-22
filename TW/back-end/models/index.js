const Sequelize = require("sequelize");
const db = require("../config/db");
const user = require("./user");
const experience = require("./experience");

module.exports = {
  connection: db,
  user: user,
  experience:experience,
};
