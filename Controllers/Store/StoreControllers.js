const { ERROR_MSGS } = require("../../Configs/Constants");
const mealpackModel = require("../model/MealpackModel");
const {
  sampleDetailRecipeData,
} = require("../../db/spooonacular/recipes/index");

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
      const { store_id: storeId } = req.params;
      const { data: recipeList } = req.body;
      const data = [];
      console.log(storeId, recipeList);
      for (const recipe of recipeList) {
        const detailRecipe = sampleDetailRecipeData[recipe.id];
        const mealpack = {
          detailRecipe: detailRecipe,
          storeId: Number(storeId),
          mealpackName: detailRecipe.title,
          recipeId: detailRecipe.id,
        };
        const [mealpackData] = await mealpackModel.postNewMealPack(
          mealpack,
          storeId
        );
        data.push(mealpackData);
      }
      console.log(data);
      res.status(200).json(data);
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
