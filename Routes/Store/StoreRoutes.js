const express = require("express");
const router = express.Router();
const store_ctrl = require("../../Controllers/Store/StoreControllers");

router.get("/", store_ctrl.helloWorld);

module.exports = router;
