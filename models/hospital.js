const mongoose = require("mongoose");
const { DepartmentSchema } = require("./department");

const HospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  departments: [DepartmentSchema],
});

const Hospital = mongoose.model("Hospital", HospitalSchema);

module.exports = Hospital;
