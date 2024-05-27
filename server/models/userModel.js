const mongoose = require("mongoose");

const Users = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    min: 3,
    max: 20,
  },
  totalMoney: {
    type: Number,
    default: 1000,
  },
});
module.exports = mongoose.model("Users", Users);
