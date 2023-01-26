const { ERROR_MSGS } = require("../../Configs/Constants");
const {
  sampleDetailRecipeData,
} = require("../../db/spooonacular/recipes/index");

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
      const { ingredients } = req.body;

      const data = fetch(
        "https://api.spoonacular.com/recipes/findByIngredients"
      );
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
