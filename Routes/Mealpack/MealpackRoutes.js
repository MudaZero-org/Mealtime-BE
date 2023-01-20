const express = require("express");
const router = express.Router();
const mp_ctrl = require("../../Controllers/Mealpack/MealpackControllers");

router.get("/", mp_ctrl.helloWorld);

module.exports = router;
