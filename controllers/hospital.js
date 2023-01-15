const mongoose = require("mongoose");
const Hospital = require("../models/hospital");

//this function will be used to create the new hospital
//if there exists no hospital of the same name
exports.createHospital = async (req, res) => {
  const { name, address } = req.body;

  const isHospitalExist = await Hospital.findOne({ name });
  if (isHospitalExist)
    return res.send({
      success: false,
      message: "Hospital already exist with the name " + name,
    });

  const newHospital = new Hospital({ name, address });
  newHospital.save((err) => {
    if (err) return res.send({ success: false, message: "got error " + err });
  });
  return res.send({
    success: true,
    message: "Hospital created successfully with name " + name,
  });
};

//this function will return all the hospital details
exports.getAllHospitals = async (req, res) => {
  const hospitals = await Hospital.find({});

  if (!hospitals)
    return res.send({
      success: false,
      message: "There are no hospitals saved in the database",
    });

  return res.send({
    success: true,
    message: hospitals,
  });
};

//now we need a function to get the hospital for specific _id
exports.getHospitalById = async (req, res) => {
  const hospitalId = req.body.hospitalId;

  if (!mongoose.Types.ObjectId.isValid(hospitalId))
    return res.send({
      success: false,
      message: "Hospital id is not valid.",
    });

  const hospital = await Hospital.findById({ _id: hospitalId });

  if (!hospital)
    return res.send({
      success: false,
      message: "Hospital with the given id is not found in the database!",
    });

  return res.send({
    success: true,
    message: hospital,
  });
};
