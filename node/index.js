const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
// use express.json() to get data into json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Port
const PORT = process.env.PORT || 5500;

//Use cors
app.use(cors());

//Import routes
const Routes = require("./routes/routes");

//Connection to mongodb
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("DataBase connected"))
  .catch((err) => console.log(err));

app.use("/", Routes);

//Add port and  onnect to server
app.listen(PORT, () => console.log("Server connected"));
