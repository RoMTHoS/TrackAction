// import mongoose to create new Schema
const mongoose = require("mongoose");

//create Schema
const HabitSchema = new mongoose.Schema({
  habit: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    require: true,
  },
  className: [String],
});

//export this Schema
module.exports = mongoose.model("habit", HabitSchema);
