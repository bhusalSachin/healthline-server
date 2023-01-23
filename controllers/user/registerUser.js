const { User } = require("../../models/user");
const { Message } = require("../../msc/Message");

//user register function wil be put here
exports.registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log("Got to register user, ", { name, email, phone, password });
  //have to save the information in the database
  //lets first check if the user already exists(email based)
  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.send(Message("Sorry! User with the email already exists!"));
  }

  const user = new User({ name, email, phone, password });
  await user.save((err) => {
    if (err)
      return res.send(
        Message("Sorry! Couldn't save the user, try again please!")
      );
  });

  return res.send(
    Message(
      "Congratulations! " +
        name +
        ".You have successfully registered in our system!",
      true
    )
  );
};
