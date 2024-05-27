const express = require("express");
const userRoute = express();
const bodyParser = require("body-parser");
userRoute.use(express.static("public"));
userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));

const userController = require("../controllers/userController.js");

userRoute.post("/add-user", userController.addUser);
userRoute.get("/select-player", userController.selectPlayer);
userRoute.get("/remove-player", userController.removePlayer);
userRoute.get("/view-selected-player", userController.viewSelectedPlayers);
userRoute.get("/view-user", userController.viewUser);

module.exports = userRoute;
