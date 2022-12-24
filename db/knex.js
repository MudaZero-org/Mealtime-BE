require("dotenv").config({ path: __dirname + "/../.env.local"});

const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile");
const knex = require("knex")(config[environment])

module.exports = knex;
