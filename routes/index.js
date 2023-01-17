// this is where we will be handling all the routes
// related to hospitalRouter, Department, doctors, idk many more
const express = require("express");
const router = express.Router();
const hospitalRouter = require("./hospital/hospital");
const departmentRouter = require("./hospital/department");
const doctorRouter = require("./hospital/doctor");
const userRouter = require("./user/index");

// simple get request
router.get("/", (req, res) => {
  return res.send("Welcome to the healthline");
});

//using the admin routes just created
router.use(hospitalRouter);
router.use(departmentRouter);
router.use(doctorRouter);

//using the general user routes
router.use(userRouter);

module.exports = router;
