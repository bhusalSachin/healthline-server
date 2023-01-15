const mongoose = require("mongoose");

const DepartmentSchema = mongoose.Schema({
  name: String,
  description: String,
});

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = { Department, DepartmentSchema };
