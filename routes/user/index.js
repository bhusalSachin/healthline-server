//this file will be used to make all the routes
//related to the user side
//for now will be making login/register part only
const express = require("express");
const { loginUser } = require("../../controllers/user/loginUser");
const { registerUser } = require("../../controllers/user/registerUser");
const {
  validateRegisterForm,
  checkValidationResult,
  validateLoginForm,
} = require("../../middlewares/validateRegisterForm");
const router = express.Router();

router.post(
  "/user/register",
  validateRegisterForm,
  checkValidationResult,
  registerUser
);
router.post("/user/login", validateLoginForm, loginUser);

module.exports = router;
