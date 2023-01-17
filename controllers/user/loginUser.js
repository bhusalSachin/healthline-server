//this is where the login functionality will be made

const { Message } = require("../../msc/Message");

exports.loginUser = async (req, res) => {
  return res.send(Message("Okaay logging in...", true));
};
