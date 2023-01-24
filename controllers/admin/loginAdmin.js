//this is where the login functionality will be made
const { Message } = require("../../msc/Message");
const Hospital = require("../../models/hospital");
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
  return res.send(Message({ hospitalId: admin._id, token: "my_token" }, true));
};
