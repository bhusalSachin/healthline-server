//this file will be used to make all the routes
//related to the user side
//for now will be making login/register part only
const express = require("express");
const { loginUser } = require("../../controllers/user/loginUser");
const { registerUser } = require("../../controllers/user/registerUser");
const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

module.exports = router;