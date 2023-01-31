require("dotenv").config({ path: __dirname + "/../../.env.local" });

const axios = require("axios").default;
const { ERROR_MSGS } = require("../../Configs/Constants");
const {
  sampleDetailRecipeData,
} = require("../../db/spooonacular/recipes/index");
const {dataFilter} = require("./ControllerHelper");

const MealpackController = {
  helloWorld: async (req, res) => {
    try {
      res.status(200).json({ message: "Hello world from MP" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },

  getRecipeByIngredients: async (req, res) => {
    try {
      const { ingredients, filteredWords } = req.body;
      ingredients = ingredients.map((ingre) => ingre.toLowerCase());
      filteredWords = filteredWords.map((word) => word.toLowerCase());

      console.log(ingredients, filteredWords);

      const data = axios.get(
        "https://api.spoonacular.com/recipes/findByIngredients",
        {
          params: {
            ingredients: ingredients,
            apiKey: process.env.API_KEY,
            numbers: 10,
          },
        }
      );
      console.log(data);

      if (filteredWords.length < 1) {
        res.status(200).json(data);
        return;
      }

      const filteredData = dataFilter(data, filteredWords)
      console.log(filteredData);

      res.status(200).json(filteredData);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },

  getRecipeInfo: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },

  getMealpackInstruction: async (req, res) => {
    try {
      const { recipe_id } = req.params;
      const recipeId = Number(recipe_id);
      const data = sampleDetailRecipeData[recipeId];
      if (!data) {
        res.status(404).json({ message: ERROR_MSGS.NOT_FOUND });
        return;
      }
      console.log(data);
      res.render("./index.ejs", { recipe: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = MealpackController;
