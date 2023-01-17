const { Message } = require("../../msc/Message");

//user register function wil be put here
exports.registerUser = async (req, res) => {
  return res.send(Message("Got to register a user", true));
};
