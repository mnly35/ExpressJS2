const mongoose = require("mongoose");

const student = mongoose.Schema({
  sno: {
    type: Number,
    require: true,
  },
  sname: {
    type: String,
    require: true,
  },
  semail: {
    type: String,
    require: true,
  },
  enrolldate: {
    type: Date,
    default: Date.now,
  },
  sdob: {
    type: Date,
    require: false,
  },
  scity: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Student", student);
