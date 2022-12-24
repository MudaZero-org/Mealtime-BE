/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("meal_packs", (table) => {
    table.increments("meal_pack_id").primary();
    table
      .integer("business_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.integer("quantity");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("meal_packs");
};
