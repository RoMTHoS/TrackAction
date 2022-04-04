const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
// use express.json() to get data into json format
app.use(express.json());
//Port
const PORT = process.env.PORT || 5500;

//Import routes
const TodoItemRoute = require("./routes/todoItems");

//Connection to mongodb
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("DataBase connected"))
  .catch((err) => console.log(err));

app.use("/", TodoItemRoute);

//Add port and  onnect to server
app.listen(PORT, () => console.log("Server connected"));
