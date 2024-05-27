const Players = require("../models/playersModel");
const path = require("path");
const fs = require("fs");

module.exports.addPlayer = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (name.trim() === "" && !price) {
      res
        .status(400)
        .send({ success: false, message: "Please Enter Valid Details" });
    } else {
      const addPlayer = new Players({
        name: name,
        price: price,
      });
      if (req.file) {
        addPlayer.image = req.file.filename;
      } else {
        addPlayer.image = null;
      }
      await addPlayer.save();
      res
        .status(200)
        .send({ success: true, message: "Player Added Successfully" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports.viewAllPlayers = async (req, res) => {
  try {
    viewAllPlayers = await Players.find({});
    const fileURL = path.join(__dirname, `../public/uploades/`);
    FILE_PATH = "http://localhost:4000/uploades";
    DEFAULT_IMAGE = "http://localhost:4000/uploades/default.png";
    if (viewAllPlayers) {
      var getPlayer = viewAllPlayers.map((player) => {
        if (fs.existsSync(`${fileURL}${player.image}`)) {
          return {
            ...player.toObject(),
            image: `${FILE_PATH}/${player.image}`,
          };
        } else {
          return {
            ...player.toObject(),
            image: `${DEFAULT_IMAGE}`,
          };
        }
      });
    }
    res.status(200).send({
      success: true,
      message: "All Players Viewed Successfully",
      data: getPlayer,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
