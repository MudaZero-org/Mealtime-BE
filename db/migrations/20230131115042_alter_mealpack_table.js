/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("meal_packs", (table) => {
    table.renameColumn("is_publishing", "is_favorite");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("meal_packs", (table) => {
    table.renameColumn("is_favorite", "is_publishing");
  });
};
