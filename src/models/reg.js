const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cnfpass: {
    type: String,
    required: true,
  },
});

const Register = new mongoose.model("Register", empSchema)

module.exports = Register;