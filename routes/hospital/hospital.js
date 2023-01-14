// will be implementing all the routes related to hospitals
// such as creating hospital, deleting and more..
const express = require("express");
const { createHospital } = require("../../controllers/createHosptal");
const router = express.Router();

// hospital creating api
router.post("/hospital/createhospital", createHospital);

module.exports = router;
