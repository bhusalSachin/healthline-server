const express = require("express");
const cors = require("cors");
const passport = require("passport");
const app = express();

// enabling cross origin resource sharing
app.use(cors());
app.use(express.json());

//accesing .env file
const dotenv = require("dotenv");
dotenv.config();

//connecting to the mongodb
require("./models/db");

//passport js config
const initializePassport = require("./middlewares/passport");
initializePassport(passport);
app.use(passport.initialize());
//using all the apis/routes
const router = require("./routes");
app.use(router);

app.listen(process.env.PORT, () => {
  console.log("listening to the port 8000");
});
