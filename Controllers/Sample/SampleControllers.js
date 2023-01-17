const { ERROR_MSGS } = require("../../Configs/Constants");

const SampleController = {
  helloWorld: async (req, res) => {
    try {
      res.status(200).json({ message: "Hello world from sample" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  getRecipeByIngredients: async (req, res) => {
    try {
      const { ingredients } = req.body;

      const eggplantRecipe = require("../../db/spooonacular/ingredients/eggplant.json");
      const onionChicken = require("../../db/spooonacular/ingredients/onion,chicken.json");
      const potatoOnionCarrot = require("../../db/spooonacular/ingredients/potato,onion,carrot.json");

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
        res.status(200).json(eggplantRecipe);
      } else if (onion && chicken) {
        res.status(200).json(onionChicken);
      } else if (potato && onion && carrot) {
        res.status(200).json(potatoOnionCarrot);
      } else {
        res.status(500).json({
          message: "no recipe found by these ingredients",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
  getRecipeInfo: async (req, res) => {
    try {
      let { recipe_id } = req.params;
      recipe_id = Number(recipe_id);

      const recipe632849 = require("../../db/spooonacular/recipes/632849.json");
      const recipe633008 = require("../../db/spooonacular/recipes/633008.json");
      const recipe663323 = require("../../db/spooonacular/recipes/663323.json");
      const recipe633212 = require("../../db/spooonacular/recipes/633212.json");
      const recipe642287 = require("../../db/spooonacular/recipes/642287.json");
      const recipe634342 = require("../../db/spooonacular/recipes/634342.json");
      const recipe648118 = require("../../db/spooonacular/recipes/648118.json");
      const recipe651956 = require("../../db/spooonacular/recipes/651956.json");
      const recipe641811 = require("../../db/spooonacular/recipes/641811.json");
      const recipe642303 = require("../../db/spooonacular/recipes/642303.json");

      const recipe715525 = require("../../db/spooonacular/recipes/715525.json");
      const recipe716342 = require("../../db/spooonacular/recipes/716342.json");
      const recipe664206 = require("../../db/spooonacular/recipes/664206.json");
      const recipe633538 = require("../../db/spooonacular/recipes/633538.json");
      const recipe716427 = require("../../db/spooonacular/recipes/716427.json");
      const recipe641904 = require("../../db/spooonacular/recipes/641904.json");
      const recipe1062882 = require("../../db/spooonacular/recipes/1062882.json");
      const recipe715394 = require("../../db/spooonacular/recipes/715394.json");
      const recipe632821 = require("../../db/spooonacular/recipes/632821.json");
      const recipe710766 = require("../../db/spooonacular/recipes/710766.json");

      const recipe715446 = require("../../db/spooonacular/recipes/715446.json");
      const recipe655726 = require("../../db/spooonacular/recipes/655726.json");
      const recipe648470 = require("../../db/spooonacular/recipes/648470.json");
      const recipe648883 = require("../../db/spooonacular/recipes/648883.json");
      const recipe647016 = require("../../db/spooonacular/recipes/647016.json");
      const recipe982375 = require("../../db/spooonacular/recipes/982375.json");
      const recipe648749 = require("../../db/spooonacular/recipes/648749.json");
      const recipe632463 = require("../../db/spooonacular/recipes/632463.json");
      const recipe649229 = require("../../db/spooonacular/recipes/649229.json");
      const recipe645572 = require("../../db/spooonacular/recipes/645572.json");

      const sampleRecipeArr = [
        recipe632849,
        recipe633008,
        recipe663323,
        recipe633212,
        recipe642287,
        recipe634342,
        recipe648118,
        recipe651956,
        recipe641811,
        recipe642303,
        recipe715525,
        recipe716342,
        recipe664206,
        recipe633538,
        recipe716427,
        recipe641904,
        recipe1062882,
        recipe715394,
        recipe632821,
        recipe710766,
        recipe715446,
        recipe655726,
        recipe648470,
        recipe648883,
        recipe647016,
        recipe982375,
        recipe648749,
        recipe632463,
        recipe649229,
        recipe645572,
      ];

      for (const recipe of sampleRecipeArr) {
        if ((recipe_id = recipe.id)) {
          res.status(200).json(recipe);
          break;
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: ERROR_MSGS.INTERNAL_SERVER_ERROR });
    }
  },
};

module.exports = SampleController;
