const { Doctor } = require("../../models/doctor");
const Hospital = require("../../models/hospital");
const mongoose = require("mongoose");
const { Department } = require("../../models/department");
const { Message } = require("../../msc/Message");
//this function will be used to create a new doctor
//we also have to push the doctor to the specific department
//of specific hospital
//i.e hospitalId and departmentId is must
exports.createDoctor = async (req, res) => {
  const doctorObj = req.body;
  const { name, isBusy } = doctorObj;

  //check if hospital with the given id exists or not
  //first check the validity of id as
  if (
    !doctorObj.hospitalId ||
    !mongoose.Types.ObjectId.isValid(doctorObj.hospitalId)
  )
    return res.send(Message("Got invalid hospital id!"));

  const hospital = await Hospital.findOne({ _id: doctorObj.hospitalId });
  if (!hospital)
    return res.send(
      Message("Sorry! Hospital doesn't exist with the given id!")
    );

  //check if doctor with the name given already exists
  const isDoctorExist = await Hospital.findOne({
    _id: doctorObj.hospitalId,
    "departments.doctors.name": name,
  });
  if (isDoctorExist)
    return res.send(
      Message(
        "Sorry! " +
          name +
          " doctor already exists in " +
          hospital.name +
          " hospital"
      )
    );
  //now let's check if the department with the given id exist
  //in that particular hospital
  if (
    !doctorObj.departmentId ||
    !mongoose.Types.ObjectId.isValid(doctorObj.departmentId)
  )
    return res.send(Message("Sorry! Got invalid deapartment id"));
  const department = await Hospital.findOne({
    _id: doctorObj.hospitalId,
    "departments._id": doctorObj.departmentId,
  });
  if (!department)
    return res.send(
      Message(
        "Sorry! Department with the given id doesn't exist in " +
          hospital.name +
          " hospital!"
      )
    );

  //finally creating and saving the doctor
  const doctor = new Doctor({ name, isBusy });
  await doctor.save((err) => {
    if (err) {
      return res.send(
        Message("Sorry, got problems while saving the doctor records!")
      );
    }
  });

  //updating doctor and department database
  try {
    await Department.updateOne(
      { _id: doctorObj.departmentId },
      { $push: { doctors: doctor } },
      { new: true }
    );
    await Hospital.updateOne(
      {
        _id: doctorObj.hospitalId,
        departments: { $elemMatch: { _id: doctorObj.departmentId } },
      },
      { $push: { "departments.$.doctors": doctor } },
      { new: true }
    );
  } catch (err) {
    return res.send(
      Message(
        "Sorry! got error while updating the department and hospital dataset"
      )
    );
  }

  return res.send(
    Message(
      "Doctor with the name " +
        doctor.name +
        " created added to the " +
        department.name +
        " of the " +
        hospital.name +
        " hospital",
      true
    )
  );
};
