const passport = require("passport");
const { Message } = require("../msc/Message");

exports.authenticateHospital = (req, res, next) => {
  console.log("inside authenticate admin");
  return passport.authenticate(
    "jwt",
    { session: false },
    (err, hospital, info) => {
      if (err || !hospital) return res.send(Message("Not authorized"));
      return res.send(Message(hospital, true));
    }
  )(req, res, next);
};
