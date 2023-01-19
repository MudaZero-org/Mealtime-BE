const express = require("express");
const router = express.Router();
const store_ctrl = require("../../Controllers/Store/StoreControllers");
const { verifyToken } = require("../../Controllers/validationMiddleWare");

router.get("/", verifyToken, store_ctrl.helloWorld);

router.get("/:store_id/mealpack/all", store_ctrl.getAllMaelpacks);
router.get(
  "/:store_id/mealpack/all/status/:publish_status",
  store_ctrl.getCurrentPastMealpack
);

module.exports = router;
