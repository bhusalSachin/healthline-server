//this is where the login functionality will be made

const { User } = require("../../models/user");
const { Message } = require("../../msc/Message");
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  //first find the user
  //then take out password
  //check using one of the methods of bcryptjs
  const user = await User.findOne({ email });
  if (!user)
    return res.send(Message("Sorry! User doesn't exist with provided email!"));
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch)
    return res.send(Message("Sorry! email and password doesn't match!"));
  return res.send(Message("Logged in successsfully", true));
};
