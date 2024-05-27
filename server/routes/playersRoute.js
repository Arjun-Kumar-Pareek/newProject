const express = require("express");
const playersRoute = express();
const bodyParser = require("body-parser");
const helper = require("../utils/helper.js");
playersRoute.use(express.static("public"));
playersRoute.use(bodyParser.json());
playersRoute.use(bodyParser.urlencoded({ extended: true }));

const playersController = require("../controllers/playersController.js");

playersRoute.post(
  "/add-player",
  helper.uploadImage.single("image"),
  playersController.addPlayer
);

playersRoute.get("/view-all-players", playersController.viewAllPlayers);

module.exports = playersRoute;
