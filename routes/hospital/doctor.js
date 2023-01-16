const express = require("express");
const { createDoctor } = require("../../controllers/doctor");

const router = express.Router();

//here we will make the routes/api related to the doctors
router.post("/doctor/createdoctor", createDoctor);

module.exports = router;
