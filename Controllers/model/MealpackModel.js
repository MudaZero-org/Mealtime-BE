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
    const { mealpackName, recipeId, detailRecipe } = data;
    return knex("meal_packs")
      .insert({
        name: mealpackName,
        store_id: storeId,
        recipe_id: recipeId,
        recipe: detailRecipe,
        is_publishing: true,
        is_delete: false,
      })
      .returning([
        "id",
        "name",
        "store_id",
        "recipe_id",
        "recipe",
        "is_publishing",
        "is_delete",
      ]);
  },
  putMealpackPublishStatus(storeId, mealpackId, status) {
    return knex("meal_packs")
      .update({
        is_publishing: status,
      })
      .where({ store_id: storeId, id: mealpackId })
      .returning(["id", "name", "store_id", "is_publishing"]);
  },
};

module.exports = UserModel;
