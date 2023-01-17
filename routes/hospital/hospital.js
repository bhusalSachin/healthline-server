// will be implementing all the routes related to hospitals
// such as creating hospital, deleting and more..
const express = require("express");
const {
  createHospital,
  getAllHospitals,
  getHospitalById,
} = require("../../controllers/admin/hospital");
const router = express.Router();

// hospital creating api
router.post("/hospital/createhospital", createHospital);
router.post("/hospital/getallhospitals", getAllHospitals);
router.post("/hospital/gethospitalbyid", getHospitalById);

module.exports = router;
