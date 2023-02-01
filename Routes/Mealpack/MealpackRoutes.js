const express = require("express");
const router = express.Router();
const mp_ctrl = require("../../Controllers/Mealpack/MealpackControllers");
const {
  verifyToken,
  validateGetRecipeByIngredients,
} = require("../../Controllers/validationMiddleWare");

router.get("/", mp_ctrl.helloWorld);
router.get("/:recipe_id/instruction", mp_ctrl.getMealpackInstruction);
router.get("/recipe/detail/:recipe_id", mp_ctrl.getRecipeInfo);

router.post(
  "/recipe",
  verifyToken,
  validateGetRecipeByIngredients,
  mp_ctrl.getRecipeByIngredients
);

module.exports = router;
