const express = require("express");
const router = express.Router();
const user_ctrl = require("../../Controllers/User/UserControllers");
const {
  validateSignUp,
  validateLogin,
} = require("../../Controllers/validationMiddleWare");

router.post("/logIn", validateLogin, user_ctrl.logIn);
router.post("/signUp", validateSignUp, user_ctrl.signUp);

module.exports = router;
