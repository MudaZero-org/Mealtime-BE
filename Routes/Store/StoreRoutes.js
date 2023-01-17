const express = require("express");
const router = express.Router();
const store_ctrl = require("../../Controllers/Store/StoreControllers");

router.get("/", store_ctrl.helloWorld);

router.get("/:store_id/mealpack/all", store_ctrl.getAllMaelpacks);

module.exports = router;
