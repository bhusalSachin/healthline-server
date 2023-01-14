const express = require("express");
const cors = require("cors");
const app = express();

// enabling cross origin resource sharing
app.use(cors());
app.use(express.json());

//accesing .env file
const dotenv = require("dotenv");
dotenv.config();

//connecting to the mongodb
require("./models/db");

app.get("/", (req, res) => {
  return res.send("welcome to the healthline");
});

app.listen(process.env.PORT, () => {
  console.log("listening to the port 8000");
});
