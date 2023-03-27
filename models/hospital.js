const mongoose = require("mongoose");
const { DepartmentSchema } = require("./department");

const HospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  coordinates: Object,
  phone: String,
  image: String,
  username: String,
  password: String,
  isBedAvail: {
    type: Boolean,
    default: false,
  },
  isDocAvail: {
    type: Boolean,
    default: false,
  },
  isMedAvail: {
    type: Boolean,
    default: false,
  },
  isAmbulAvail: {
    type: Boolean,
    default: false,
  },
  isBloodAvail: {
    type: Boolean,
    default: false,
  },
  departments: [DepartmentSchema],
  services: [String],
});

const Hospital = mongoose.model("Hospital", HospitalSchema);

module.exports = Hospital;
