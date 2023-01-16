const mongoose = require("mongoose");
const { DoctorSchema } = require("./doctor");

const DepartmentSchema = mongoose.Schema({
  name: String,
  description: String,
  doctors: [DoctorSchema],
});

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = { Department, DepartmentSchema };
