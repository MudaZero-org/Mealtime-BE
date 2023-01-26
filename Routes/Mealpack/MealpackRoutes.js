const express = require("express");
const router = express.Router();
const mp_ctrl = require("../../Controllers/Mealpack/MealpackControllers");

router.get("/", mp_ctrl.helloWorld);
router.get("/:recipe_id/instruction", mp_ctrl.getMealpackInstruction);

module.exports = router;
