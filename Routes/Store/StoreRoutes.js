const express = require("express");
const router = express.Router();
const store_ctrl = require("../../Controllers/Store/StoreControllers");
const {
  verifyToken,
  validatePostMealPack,
  validatePutMealPack,
  validatePostFilterList,
  validateGetFilterListByStoreId,
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

router.get(
  "/:store_id/filter_list",
  verifyToken,
  validateGetFilterListByStoreId,
  store_ctrl.getFilterList
);
router.post(
  "/:store_id/filter_list",
  verifyToken,
  validatePostFilterList,
  store_ctrl.postFilterList
);

module.exports = router;
