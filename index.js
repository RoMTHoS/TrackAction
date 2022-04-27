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
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

//Import routes
const Routes = require("./routes/routes");

//Connection to mongodb
mongoose
  .connect(process.env.MONGODB_URI || process.env.DB_CONNECT)
  .then(() => console.log("DataBase connected"))
  .catch((err) => console.log(err));

app.use("/", Routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Add port and  onnect to server
app.listen(PORT, () => console.log("Server connected"));
