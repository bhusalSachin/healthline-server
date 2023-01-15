// will be implementing all the routes related to hospitals
// such as creating hospital, deleting and more..
const express = require("express");
const {
  createHospital,
  getAllHospitals,
} = require("../../controllers/hospital");
const router = express.Router();

// hospital creating api
router.post("/hospital/createhospital", createHospital);
router.get("/hospital/getallhospitals", getAllHospitals);

module.exports = router;
