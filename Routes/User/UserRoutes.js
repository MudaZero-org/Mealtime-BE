const express = require("express");
const router = express.Router();
const user_ctrl = require("../../Controllers/User/UserControllers");

router.get("/", user_ctrl.helloWorld);

module.exports = router;
