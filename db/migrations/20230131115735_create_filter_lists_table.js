/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("filter_lists", (table) => {
    table.increments("id").primary();
    table.string("filter_name").notNullable();
    table
      .integer("store_id")
      .references("id")
      .inTable("stores")
      .onDelete("CASCADE");
    table.json("filtered_ingredients").notNullable();
    table.boolean("is_delete").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("filter_lists"); 
};
