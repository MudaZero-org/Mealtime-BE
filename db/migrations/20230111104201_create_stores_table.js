/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("stores", (table) => {
		table.increments("id").primary();
		table.string("name");
		table.string("company_name").notNullable();
		table.integer("postal_code", 7).notNullable();
		table.string("store_address").notNullable();
		table.integer("phone_number", 11).notNullable();
		table.string("email").notNullable();
		table.string("owner").notNullable();
		table.string("password").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("stores");
};
