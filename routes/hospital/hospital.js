// will be implementing all the routes related to hospitals
// such as creating hospital, deleting and more..
const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const {
  createHospital,
  getAllHospitals,
  getHospitalById,
  editHospital,
  deleteHospital,
} = require("../../controllers/admin/hospital");
const { loginAdmin } = require("../../controllers/admin/loginAdmin");
const {
  authenticateHospital,
} = require("../../middlewares/authenticateHospital");
const {
  validateHospitalAddForm,
  checkValidationResult,
} = require("../../middlewares/validateRegisterForm");
const { Message } = require("../../msc/Message");
const router = express.Router();

// hospital creating api
router.post(
  "/hospital/createhospital",
  validateHospitalAddForm,
  checkValidationResult,
  createHospital
);
router.post(
  "/hospital/edithospital",
  // validateHospitalAddForm,
  // checkValidationResult,
  editHospital
);
router.post("/hospital/deletehospital", deleteHospital);
router.post("/hospital/getallhospitals", getAllHospitals);
router.post("/hospital/gethospitalbyid", getHospitalById);
router.post("/hospital/login", loginAdmin);
router.post(
  "/hospital/enter",
  // passport.authenticate("jwt", { session: false }),
  authenticateHospital,
  (req, res) => {
    return res.send(Message("authentication successful", true));
  }
);

module.exports = router;
