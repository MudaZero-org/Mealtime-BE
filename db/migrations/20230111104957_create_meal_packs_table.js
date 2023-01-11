/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("meal_packs", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table
      .integer("store_id")
      .references("id")
      .inTable("stores")
      .onDelete("CASCADE");
    table.boolean("is_publishing").notNullable();
    table.boolean("is_delete").notNullable();
    table.json("recipe");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("meal_packs");
};
