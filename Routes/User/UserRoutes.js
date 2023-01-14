const express = require("express");
const router = express.Router();
const user_ctrl = require("../../Controllers/User/UserControllers");

router.get("/", user_ctrl.helloWorld);
router.get("/login", user_ctrl.logIn);
router.get("/signup", user_ctrl.signUp);

module.exports = router;
