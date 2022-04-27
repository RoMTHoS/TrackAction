const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  creatAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
