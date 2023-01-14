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
        res.send(eggplantRecipe);
      } else if (onion && chicken) {
        res.send(onionChicken);
      } else if (potato && onion && carrot) {
        res.send(potatoOnionCarrot);
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
};

module.exports = SampleController;
