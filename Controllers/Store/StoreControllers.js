const axios = require("axios").default;
const { ERROR_MSGS } = require("../../Configs/Constants");
const mealpackModel = require("../model/MealpackModel");
const filterListModel = require("../model/FilterListModel");
const {
  sampleDetailRecipeData,
} = require("../../db/spooonacular/recipes/index");

const StoreController = {
  getAllMealpacksInfo: async (req, res) => {
    try {
      let { store_id: storeId } = req.params;
      const data = await mealpackModel.getAllMealPacks(storeId);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  getFavoriteMealpacks: async (req, res) => {
    try {
      const { store_id: storeId } = req.params;
      const data = await mealpackModel.getAllMealPacksFavorite(storeId);

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
        const resData = await axios.get(
          `https://api.spoonacular.com/recipes/${recipe.id}/information`,
          {
            params: {
              apiKey: process.env.API_KEY,
            },
          }
        );
        const recipeDetail = resData.data;

        if (!recipeDetail) {
          data.push({ message: ERROR_MSGS.CREATE_FAILED });
        } else {
          const mealpack = {
            detailRecipe: recipeDetail,
            storeId: Number(storeId),
            mealpackName: recipeDetail.title,
            recipeId: recipeDetail.id,
          };
          const [mealpackData] = await mealpackModel.createNewMealPack(
            mealpack,
            storeId
          );
          data.push(mealpackData);
        }
      }
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  putMealPackInfo: async (req, res) => {
    try {
      const { store_id: storeId, mealpack_id: mealpackId } = req.params;
      const { mealpackName, isFavorite, isDelete } = req.body;
      console.log(isPublishing);

      const [data] = await mealpackModel.updateMealpack(
        mealpackName,
        storeId,
        mealpackId,
        isFavorite,
        isDelete
      );
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },

  getFilterList: async (req, res) => {
    try {
      const { store_id: storeId } = req.params;
      console.log(storeId);
      const data = await filterListModel.getFilterListByStoreId(storeId);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  postFilterList: async (req, res) => {
    try {
      const { store_id: storeId } = req.params;
      const { filterName, filteredIngredients } = req.body;
      console.log(storeId, filterName, filteredIngredients);
      const [data] = await filterListModel.createFilterList({
        storeId,
        filterName,
        filteredIngredients,
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = StoreController;
