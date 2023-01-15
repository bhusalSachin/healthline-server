const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  departments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
});

const Hospital = mongoose.model("Hospital", HospitalSchema);

module.exports = Hospital;
