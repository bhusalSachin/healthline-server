const mongoose = require("mongoose");
import Department from "./department";

const HospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  departments: [Department],
});

const Hospital = mongoose.model("Hospital", HospitalSchema);

module.exports = Hospital;
