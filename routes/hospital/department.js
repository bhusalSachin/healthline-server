const express = require("express");
const {
  createDepartment,
  getAllDepartments,
} = require("../../controllers/admin/department");
const router = express.Router();

//this will deal all the api routes related to the department section
router.post("/department/createdepartment", createDepartment);
router.post("/department/getalldepartments", getAllDepartments);

module.exports = router;
