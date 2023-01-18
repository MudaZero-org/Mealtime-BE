//Talks to the DB

const knex = require("../../db/knex");

const UserModel = {
  getAllMealPack(storeId) {
    return knex
      .select({
        id: "id",
        name: "name",
        store_id: "store_id",
        recipe_id: "recipe_id",
        is_publishing: "is_publishing",
        is_delete: "is_delete",
      })
      .from("meal_packs")
      .where("store_id", storeId);
  },
  getAllMealPackCurrentPast(storeId, status) {
    return knex
      .select({
        id: "id",
        mealpackName: "name",
        storeId: "store_id",
        isPublishing: "is_publishing",
      })
      .from("meal_packs")
      .where({ store_id: storeId, is_publishing: status });
  },
  postNewMealPack(data, storeId) {
    return knex("meal_packs")
      .insert({
        name: data[0],
        store_id: Number(storeId),
        recipe_id: Number(data[1]),
        recipe: data[2] || null,
        is_publishing: true,
        is_delete: false,
      })
  },
};

module.exports = UserModel;
