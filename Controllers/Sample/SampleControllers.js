const { ERROR_MSGS } = require("../../Configs/Constants");
const {
  sampleDetailRecipeData,
} = require("../../db/spooonacular/recipes/index");
const { sampleRecipeData } = require("../../db/spooonacular/ingredients/index");
const { dataFilter } = require("./ControllerHelper");
const SampleController = {
  getRecipeByIngredients: async (req, res) => {
    try {
      const { ingredients, filteredWords } = req.body;
      console.log(ingredients, filteredWords);
      let eggplant = false;
      let onion = false;
      let chicken = false;
      let potato = false;
      let carrot = false;

      for (let ingredient of ingredients) {
        if (ingredient === "eggplant") {
          eggplant = true;
        } else if (ingredient === "onion") {
          onion = true;
        } else if (ingredient === "chicken") {
          chicken = true;
        } else if (ingredient === "potato") {
          potato = true;
        } else if (ingredient === "carrot") {
          carrot = true;
        }
      }

      if (eggplant) {
        const sampleData = sampleRecipeData["eggplant"];
        if (filteredWords.length < 1) {
          res.status(200).json(sampleData);
          return;
        }
        const filteredData = dataFilter(sampleData, filteredWords);
        console.log(filteredData);
        res.status(200).json(filteredData);
        return;
      }
      if (onion && chicken) {
        const sampleData = sampleRecipeData["onionChicken"];
        if (filteredWords.length < 1) {
          res.status(200).json(sampleData);
          return;
        }

        const filteredData = dataFilter(sampleData, filteredWords);
        console.log(filteredData);
        res.status(200).json(filteredData);
        return;
      }
      if (potato && onion && carrot) {
        const sampleData = sampleRecipeData["potatoOnionCarrot"];
        if (filteredWords.length < 1) {
          res.status(200).json(sampleData);
          return;
        }

        const filteredData = dataFilter(sampleData, filteredWords);
        console.log(filteredData);
        res.status(200).json(filteredData);
        return;
      }
      res.status(500).json({
        message: ERROR_MSGS.NOT_FOUND,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  getRecipeInfo: async (req, res) => {
    try {
      let { recipe_id } = req.params;
      const recipeId = Number(recipe_id);
      const data = sampleDetailRecipeData[recipeId];
      if (!data) {
        res.status(404).json({ message: ERROR_MSGS.NOT_FOUND });
        return;
      }
      console.log(data);
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = SampleController;
