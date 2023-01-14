const express = require("express");
const router = express.Router();
const user_ctrl = require("../../Controllers/User/UserControllers");

router.get("/", user_ctrl.helloWorld);
router.post("/logIn", user_ctrl.logIn);
router.post("/signUp", user_ctrl.signUp);

module.exports = router;
