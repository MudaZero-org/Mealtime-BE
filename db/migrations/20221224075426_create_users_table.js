/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id").primary();
    table.string("first_name", 32).notNullable();
    table.string("last_name", 32).notNullable();
    table.string("username", 64);
    table.boolean("business").notNullable();
    table.string("gender").notNullable();
    table.string("email").notNullable();
    table.string("phone_number").notNullable();
    table.string("postal_code").notNullable();
    table.string("adress").notNullable();
    table.json("inventory");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("users");
};
