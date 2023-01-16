const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
  name: String,
  isBusy: Boolean,
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = { DoctorSchema, Doctor };
