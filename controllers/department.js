const mongoose = require("mongoose");
const { Department } = require("../models/department");
const Hospital = require("../models/hospital");
const { Message } = require("../msc/Message");

//we need to link the department to one specific hospital
//as we already set department as a field in the hospital model
//linking is not a problem, i guess
//lets make a function to create a department
exports.createDepartment = async (req, res) => {
  const departmentObj = req.body;
  const { name, description } = departmentObj;

  //checking for the validity of hospitalId
  if (
    !mongoose.Types.ObjectId.isValid(departmentObj.hospitalId) ||
    !departmentObj.hospitalId
  ) {
    return res.send(Message("Got invalid hospital id !!"));
  }

  //   finding the hospital
  //   and checking if the department already exists there
  const isDepartmentExist = await Hospital.findOne({
    _id: departmentObj.hospitalId,
    "departments.name": name,
  });

  if (isDepartmentExist) {
    return res.send(Message("department already exists"));
  }
  //saving the department
  const department = new Department({ name, description });
  await department.save((err) => {
    if (err) return res.send(Message("Got error while saving the department"));
  });

  //adding the department to the hospital
  const hospital = await Hospital.findOneAndUpdate(
    { _id: departmentObj.hospitalId },
    { $push: { departments: department } },
    { new: true }
  );

  if (!hospital) {
    return res.send(Message("hospital doesnot exist with the given id"));
  }

  return res.send(
    Message(
      name +
        " department is added successfully to the " +
        hospital.name +
        " hospital",
      true
    )
  );
};
