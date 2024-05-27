const mongoose = require("mongoose");

const SlectedPlayers = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Players" },
});
module.exports = mongoose.model("SlectedPlayers", SlectedPlayers);
