const mongoose = require("mongoose");

const Players = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    min: 3,
    max: 20,
  },
  image: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    require: true,
  },
});
module.exports = mongoose.model("Players", Players);
