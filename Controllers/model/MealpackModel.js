//Talks to the DB

const knex = require("../../db/knex");

const UserModel = {
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
};

module.exports = UserModel;
