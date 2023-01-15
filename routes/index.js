// this is where we will be handling all the routes
// related to hospitalRouter, Department, doctors, idk many more
const express = require("express");
const router = express.Router();
const hospitalRouter = require("./hospital/hospital");

// simple get request
router.get("/", (req, res) => {
  return res.send("Welcome to the healthline");
});

//using the hospital routes just created
router.use(hospitalRouter);

module.exports = router;