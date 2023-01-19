const knex = require("../../db/knex");
const { ERROR_MSGS } = require("../../Configs/Constants");
const mealpackModel = require("../model/MealpackModel");

const StoreController = {
  helloWorld: async (req, res) => {
    try {
      res.status(200).json({ message: "Hello world from store" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  getAllMaelpacks: async (req, res) => {
    try {
      let { store_id: storeId } = req.params;
      const data = await mealpackModel.getAllMealPack(storeId);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  getCurrentPastMealpack: async (req, res) => {
    try {
      const { store_id: storeId, publish_status: publishStatus } = req.params;
      const data = await mealpackModel.getAllMealPackCurrentPast(
        storeId,
        publishStatus
      );
      
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  postNewMealpackInfo: async (req, res) => {
    try {
      let { store_id } = req.params;
      let { mealpack_name, recipe_id, recipe } = req.body;
      store_id = Number(store_id)
      recipe_id = Number(recipe_id)
      console.log(mealpack_name, recipe_id, recipe);

      const returnData = await mealpackModel.postNewMealPack(mealpack_name, store_id, recipe_id, recipe);
      console.log(returnData);
      res.status(200).json(returnData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  putMealPackPublishingStatus: async (req, res) => {
    try {
      const { store_id, mealpack_id } = req.params;
      const { mealpack_name, is_publishing, is_delete } = req.body;
      console.log(is_publishing);

      const data = await mealpackModel.putMealpackPublishStatus(
        mealpack_name,
        store_id,
        mealpack_id,
        is_publishing,
        is_delete
      );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = StoreController;
