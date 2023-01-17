const express = require("express");
const router = express.Router();
const sample_ctrl = require("../../Controllers/Sample/SampleControllers");

router.get("/", sample_ctrl.helloWorld);

router.get("/recipe/detail/:recipe_id", sample_ctrl.getRecipeInfo);

router.post("/recipe", sample_ctrl.getRecipeByIngredients);


module.exports = router;
