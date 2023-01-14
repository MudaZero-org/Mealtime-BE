const express = require("express");
const router = express.Router();
const customer_ctrl = require("../../Controllers/Customer/CustomerControllers");

router.get("/", customer_ctrl.helloWorld);

module.exports = router;
