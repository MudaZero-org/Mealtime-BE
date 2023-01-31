require("dotenv").config();

const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile");
const knex = require("knex")(config[environment]);

module.exports = knex;
