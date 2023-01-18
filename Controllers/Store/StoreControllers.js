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
      const { store_id } = req.params;
      const { data } = req.body;

      await mealpackModel.postNewMealPack(data, store_id).then(
        res.status(200).json({
          message: "mealpack information posted successfully",
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  putMealPackPublishingStatus: async (req, res) => {
    try {
      const { store_id, mealpack_id } = req.params;
      const { is_publishing } = req.body;

      await mealpackModel
        .putMealpackPublishStatus(store_id, mealpack_id, is_publishing)
        .then(
          res.status(200).json({
            message: "mealpack publish status update successfully",
          })
        );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = StoreController;
