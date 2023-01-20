const express = require("express");
const router = express.Router();
const store_ctrl = require("../../Controllers/Store/StoreControllers");
const {
  verifyToken,
  validatePostMealPack,
  validatePutMealPack,
} = require("../../Controllers/validationMiddleWare");

router.get("/:store_id/mealpack/all", verifyToken, store_ctrl.getAllMealpacks);
router.get(
  "/:store_id/mealpack/all/status/:publish_status",
  verifyToken,
  store_ctrl.getCurrentPastMealpack
);

router.post(
  "/:store_id/mealpack",
  verifyToken,
  validatePostMealPack,
  store_ctrl.postNewMealpackInfo
);

router.put(
  "/:store_id/mealpack/:mealpack_id",
  verifyToken,
  validatePutMealPack,
  store_ctrl.putMealPackPublishingStatus
);

module.exports = router;
