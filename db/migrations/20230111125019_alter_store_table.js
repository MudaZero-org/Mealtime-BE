/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("stores", (table) => {
    table.renameColumn("name", "store_name");
    table.renameColumn("owner", "store_manager");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("stores", (table) => {
    table.renameColumn("store_name", "name");
    table.renameColumn("store_manager", "owner");
  });
};
