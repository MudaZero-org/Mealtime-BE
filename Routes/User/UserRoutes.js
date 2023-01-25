const express = require("express");
const router = express.Router();
const user_ctrl = require("../../Controllers/User/UserControllers");
const {
  verifyToken,
  validateSignUp,
  validateLogin,
  validatePutUser,
} = require("../../Controllers/validationMiddleWare");

router.post("/logIn", validateLogin, user_ctrl.logIn);
router.post("/signUp", validateSignUp, user_ctrl.signUp);
router.get("/refreshToken", user_ctrl.refreshToken);
router.get("/:store_id", verifyToken, user_ctrl.getStoreById);
router.put("/:store_id", verifyToken, validatePutUser, user_ctrl.updateStore);

module.exports = router;
