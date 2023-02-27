//this is where the login functionality will be made
const { Message } = require("../../msc/Message");
const Hospital = require("../../models/hospital");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  console.log("login admin ", username, " ", password);
  //very easy
  //extract document and check for the password lol
  const admin = await Hospital.findOne({ username });
  if (!admin)
    return res.send(
      Message("Sorry! Hospital doesn't find with the given username")
    );
  const isMatch = admin.password === password;

  if (!isMatch)
    return res.send(Message("Sorry! username and password doesn't match!"));

  //creating secret token to check for authentication
  // const body = { _id: admin._id, name: admin.username };
  // const token = jwt.sign({ user: body }, "TOP_SECRET");
  const token = jwt.sign({ id: admin._id }, "TOP_SECRET");
  return res.send(Message({ hospitalId: admin._id, token: token }, true));
};
