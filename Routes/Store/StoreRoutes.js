const express = require("express");
const router = express.Router();
const store_ctrl = require("../../Controllers/Store/StoreControllers");
const {
  verifyToken,
  validatePostMealPack,
  validatePutMealPack,
} = require("../../Controllers/validationMiddleWare");

router.get("/", verifyToken, store_ctrl.helloWorld);

router.get("/:store_id/mealpack/all", store_ctrl.getAllMaelpacks);
router.get(
  "/:store_id/mealpack/all/status/:publish_status",
  store_ctrl.getCurrentPastMealpack
);

router.post(
  "/:store_id/mealpack",
  validatePostMealPack,
  store_ctrl.postNewMealpackInfo
);

router.put(
  "/:store_id/mealpack/:mealpack_id",
  validatePutMealPack,
  store_ctrl.putMealPackPublishingStatus
);

module.exports = router;
