// import mongoose to create new Schema
const mongoose = require("mongoose");

//create Schema
const DaySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  content: {
    type: [
      {
        start: {
          type: Number,
          required: true,
        },
        end: {
          type: Number,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
});

//export this Schema
module.exports = mongoose.model("day", DaySchema);
