const mongoose = require("mongoose");

//create Schema
const ColorSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  self: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  obligate: {
    type: String,
    required: true,
  },
  relax: {
    type: String,
    required: true,
  },
});

//export this Schema
module.exports = mongoose.model("color", ColorSchema);
