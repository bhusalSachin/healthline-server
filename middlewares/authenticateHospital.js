const passport = require("passport");
const { Message } = require("../msc/Message");

exports.authenticateHospital = (req, res, next) => {
  const { username } = req.body;
  console.log("inside authenticate admin");
  return passport.authenticate(
    "jwt",
    { session: false },
    (err, hospital, info) => {
      if (err || !hospital) return res.send(Message("Not authorized"));
      if (!username) {
        return res.send(Message(hospital, true));
      } else {
        if (username === hospital.username) {
          return res.send(Message(hospital, true));
        } else {
          return res.send(Message("Not authorized"));
        }
      }
    }
  )(req, res, next);
};
