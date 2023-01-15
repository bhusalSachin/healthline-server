const express = require("express");
const { createDepartment } = require("../../controllers/department");
const router = express.Router();

//this will deal all the api routes related to the department section
router.post("/department/createdepartment", createDepartment);

module.exports = router;
