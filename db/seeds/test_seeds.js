/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	await knex("meal_packs").del();
	await knex("stores").del();

  await knex("stores").insert([
    {
      store_name: "Food Market 1",
      company_name: "Test Company",
      postal_code: 0000001,
      store_address: "Tokyo, Test-city",
      phone_number: 0123456789,
      email: "store1@test.com",
      store_manager: "Taro Sato",
      password: "test123",
    },
    {
      store_name: "Food Market 2",
      company_name: "Test Company",
      postal_code: 0000002,
      store_address: "Tokyo, Test-city",
      phone_number: 1234567890,
      email: "store2@test.com",
      store_manager: "Hanako Tanaka",
      password: "test123",
    },
  ]);
  await knex("meal_packs").insert([
    {
      name: "Test meal pack 1",
      store_id: 1,
      recipe_id:000001,
      is_publishing: true,
      is_delete: false,
    },
    {
      name: "Test meal pack 2",
      store_id: 1,
      recipe_id:000002,
      is_publishing: true,
      is_delete: false,
    },
    {
      name: "Test meal pack 1",
      store_id: 2,
      recipe_id:000003,
      is_publishing: true,
      is_delete: false,
    },
    {
      name: "Test meal pack 2",
      store_id: 2,
      recipe_id:000004,
      is_publishing: true,
      is_delete: false,
    },
    {
      name: "Test meal pack 3",
      store_id: 2,
      recipe_id:000005,
      is_publishing: false,
      is_delete: true,
    },
  ]);
};
