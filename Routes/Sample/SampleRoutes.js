const express = require("express");
const router = express.Router();
const sample_ctrl = require("../../Controllers/Sample/SampleControllers");
const {
  verifyToken,
  validateGetRecipeByIngredients,
} = require("../../Controllers/validationMiddleWare");

router.get("/recipe/detail/:recipe_id", sample_ctrl.getRecipeInfo);

router.post(
  "/recipe",
  verifyToken,
  validateGetRecipeByIngredients,
  sample_ctrl.getRecipeByIngredients
);

module.exports = router;
