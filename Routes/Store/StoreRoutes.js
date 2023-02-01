const express = require("express");
const router = express.Router();
const store_ctrl = require("../../Controllers/Store/StoreControllers");
const {
  verifyToken,
  validatePostMealPack,
  validatePutMealPack,
} = require("../../Controllers/validationMiddleWare");

router.get("/:store_id/mealpack/all", verifyToken, store_ctrl.getAllMealpacksInfo);
router.get(
  "/:store_id/mealpack/all/favorite",
  verifyToken,
  store_ctrl.getFavoriteMealpacks
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
  store_ctrl.putMealPackInfo
);

module.exports = router;
