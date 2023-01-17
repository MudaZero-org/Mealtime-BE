const express = require("express");
const router = express.Router();
const user_ctrl = require("../../Controllers/User/UserControllers");

router.get("/", user_ctrl.helloWorld);
router.post("/logIn", user_ctrl.logIn2);
router.post("/signUp", user_ctrl.signUp2);

module.exports = router;
