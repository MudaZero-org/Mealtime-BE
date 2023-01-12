const express = require("express");
const router = express.Router();
const sample_ctrl = require("../../Controllers/Sample/SampleControllers");

router.get("/", sample_ctrl.helloWorld);

module.exports = router;
