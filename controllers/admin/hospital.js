const mongoose = require("mongoose");
const Hospital = require("../../models/hospital");
const { Message } = require("../../msc/Message");

//this function will be used to create the new hospital
//if there exists no hospital of the same name
exports.createHospital = async (req, res) => {
  const { name, address, latitude, longitude, phone, username, password } =
    req.body;
  const isHospitalExist = await Hospital.findOne({ name });
  if (isHospitalExist) {
    return res.send(Message("hospital already exist with the name " + name));
  }

  const newHospital = new Hospital({
    name,
    address,
    coordinates: { latitude, longitude },
    phone,
    username,
    password,
  });
  // console.log("Create new hospital ", name, address, username, password);
  newHospital.save((err, hospital) => {
    if (err) return res.send(Message("got error " + err));
    console.log("hospital = ", hospital);
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
  console.log("get hospital by id = ", hospitalId);
  // const hospital = await Hospital.findById({ _id: hospitalId });
  const hospital = await Hospital.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(hospitalId) } },
    { $project: { __v: 0 } },
  ]);

  if (!hospital)
    return res.send(
      Message("Hospital with the given id is not found in the database")
    );
  return res.send(Message(hospital, true));
};

//edit hospital functionality
//take whole new hospital set for given id
exports.editHospital = async (req, res) => {
  const { newHospital, id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send(Message("Hospital id is not valid"));

  const result = await Hospital.updateOne({ _id: id }, { $set: newHospital });
  // console.log("after update result = ", result);
  if (result.modifiedCount === 1) {
    return res.send(Message("Updated Successfully!", true));
  }

  return res.send(Message("Update failed, try once again!"));
};

//delete a hospital by its id
//can access only by super admin, (will do later though)
exports.deleteHospital = async (req, res) => {
  const { hospitalId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(hospitalId))
    return res.send(Message("Hospital id is not valid"));

  const result = await Hospital.deleteOne({ _id: hospitalId });
  // console.log("after delete result = ", result);

  if (result.deletedCount === 1) {
    return res.send(Message("Deleted successfully!"));
  }
  return res.send(Message("Delete failed, try once again"));
};
