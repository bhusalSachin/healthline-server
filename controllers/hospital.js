const mongoose = require("mongoose");
const Hospital = require("../models/hospital");
const { Message } = require("../msc/Message");

//this function will be used to create the new hospital
//if there exists no hospital of the same name
exports.createHospital = async (req, res) => {
  const { name, address } = req.body;

  const isHospitalExist = await Hospital.findOne({ name });
  if (isHospitalExist) {
    return res.send(Message("hospital already exist with the name " + name));
  }

  const newHospital = new Hospital({ name, address });
  newHospital.save((err) => {
    if (err) return res.send(Message("got error " + err));
  });
  return res.send(
    Message("Hospital created successfully with name " + name, true)
  );
};

//this function will return all the hospital details
exports.getAllHospitals = async (req, res) => {
  const hospitals = await Hospital.find({});

  if (!hospitals)
    return res.send(Message("There are no hospitals saved in the database"));

  return res.send(Message(hospitals, true));
};

//now we need a function to get the hospital for specific _id
//must check the validity of the _id as objectId
exports.getHospitalById = async (req, res) => {
  const hospitalId = req.body.hospitalId;

  if (!mongoose.Types.ObjectId.isValid(hospitalId))
    return res.send(Message("Hospital id is not valid."));

  const hospital = await Hospital.findById({ _id: hospitalId });

  if (!hospital)
    return res.send(
      Message("Hospital with the given id is not found in the database")
    );
  return res.send(Message(hospital, true));
};
