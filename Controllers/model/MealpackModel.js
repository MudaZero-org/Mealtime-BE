//Talks to the DB

const knex = require("../../db/knex");

const UserModel = {
  getAllMealPacks(storeId) {
    return knex
      .select({
        id: "id",
        mealpackName: "name",
        storeId: "store_id",
        recipeId: "recipe_id",
        recipeDetail: "recipe",
        isFavorite: "is_favorite",
        isDelete: "is_delete",
      })
      .from("meal_packs")
      .where({ store_id: storeId, is_delete: false });
  },
  getAllMealPacksFavorite(storeId) {
    return knex
      .select({
        id: "id",
        mealpackName: "name",
        storeId: "store_id",
        isFavorite: "is_favorite",
        recipeDetail: "recipe",
        recipeId: "recipe_id",
      })
      .from("meal_packs")
      .where({ store_id: storeId, is_favorite: true, is_delete: false });
  },
  createNewMealPack(mealpack, storeId) {
    const { mealpackName, recipeId, detailRecipe } = mealpack;
    return knex("meal_packs")
      .insert({
        name: mealpackName,
        store_id: storeId,
        recipe_id: recipeId,
        recipe: detailRecipe,
        is_favorite: false,
        is_delete: false,
      })
      .returning([
        "id",
        "name",
        "store_id",
        "recipe_id",
        "recipe",
        "is_favorite",
        "is_delete",
      ]);
  },
  updateMealpackInfo(mealpackName, storeId, mealpackId, isFavorite, isDelete) {
    return knex("meal_packs")
      .update({
        name: mealpackName,
        is_favorite: isFavorite,
        is_delete: isDelete,
      })
      .where({ store_id: storeId, id: mealpackId })
      .returning(["id", "name", "store_id", "is_favorite", "is_delete"]);
  },
};

module.exports = UserModel;
