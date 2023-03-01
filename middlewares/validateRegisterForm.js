//this middleware willl be passed to register api
//to validate email or phone (maybe)
const { check, validationResult } = require("express-validator");
const { Message } = require("../msc/Message");

//have to pass array of all the fields that we gonna validate
exports.validateRegisterForm = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name field is empty")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Must be a string")
    .isLength({ min: 4, max: 20 })
    .withMessage("Name must be 4 to 20 characters long!"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter valid email address!"),
  check("phone")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Phone number is required")
    .isNumeric()
    .isLength({ min: 10, max: 10 })
    .withMessage("Please enter valid phone number: "),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be 6 to 15 characters long!"),
];

exports.validateHospitalAddForm = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name field is empty")
    // .matches(/^[a-zA-Z]+$/)
    // .withMessage("Name must be a string")
    .isLength({ min: 4 })
    .withMessage("Name must be at least of 4 characters"),
  check("address")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name field is empty")
    // .matches(/^[a-zA-Z]+$/)
    // .withMessage("Address must be a string")
    .isLength({ min: 4 })
    .withMessage("Name must be at least of 4 characters"),
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("username field is empty")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Username must be a string")
    .isLength({ min: 4, max: 20 })
    .withMessage("username must be 4 to 20 characters long!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 4, max: 15 })
    .withMessage("Password must be 6 to 15 characters long!"),
];

exports.validateLoginForm = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter valid email address!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password must be 6 to 15 characters long!"),
];

exports.checkValidationResult = (req, res, next) => {
  // console.log("validating form = ", req.body);
  const result = validationResult(req).array();

  if (result.length === 0) return next();

  const error = result[0].msg;

  return res.send(Message(error));
};
