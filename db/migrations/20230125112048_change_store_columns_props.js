/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.alterTable("stores", function (table) {
    table.setNullable("company_name");
    table.setNullable("postal_code");
    table.setNullable("store_address");
    table.setNullable("phone_number");
    table.setNullable("store_manager");
    table.string("profile_img");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("stores", function (table) {
    table.dropNullable("company_name");
    table.dropNullable("postal_code");
    table.dropNullable("store_address");
    table.dropNullable("phone_number");
    table.dropNullable("store_manager");
    table.dropColumn("profile_img");
  });
};
