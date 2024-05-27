const Users = require("../models/userModel");
const selectPlayers = require("../models/slectedPlayersModel");
const Players = require("../models/playersModel");

module.exports.addUser = async (req, res) => {
  try {
    const { name, totalMoney } = req.body;
    if (name.trim() === "" && !totalMoney) {
      res
        .status(400)
        .send({ success: false, message: "Please Enter Valid Details" });
    } else {
      const addUser = new Users({
        name: name,
        totalMoney: totalMoney,
      });
      await addUser.save();
      res
        .status(200)
        .send({ success: true, message: "User Added Successfully" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports.selectPlayer = async (req, res) => {
  try {
    const { playerId } = req.query;
    const findUser = await selectPlayers.find({
      userId: "664f0d09e9f856462e178be5",
    });
    const findUserData = await Users.findOne({
      _id: "664f0d09e9f856462e178be5",
    });

    const findPlayerData = await Players.findOne({
      _id: playerId,
    });

    if (findUser) {
      findPlayer = await selectPlayers.findOne({
        $and: [{ userId: "664f0d09e9f856462e178be5" }, { playerId }],
      });

      if (!findPlayer) {
        const addPlayer = new selectPlayers({
          userId: "664f0d09e9f856462e178be5",
          playerId: playerId,
        });
        await addPlayer.save();
        const totalAmount =
          (await Number(findUserData.totalMoney)) -
          Number(findPlayerData.price);
        await Users.updateOne(
          { _id: "664f0d09e9f856462e178be5" },
          { $set: { totalMoney: totalAmount } }
        );
        res
          .status(200)
          .send({ success: true, message: "Player Added Successfully" });
      } else {
        res.status(400).send({ success: false, message: "already Exist" });
      }
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports.removePlayer = async (req, res) => {
  try {
    const { playerId } = req.query;
    const findUser = await selectPlayers.find({
      userId: "664f0d09e9f856462e178be5",
    });

    const findUserData = await Users.findOne({
      _id: "664f0d09e9f856462e178be5",
    });

    const findPlayerData = await Players.findOne({
      _id: playerId,
    });

    if (findUser) {
      const totalAmount =
        (await Number(findUserData.totalMoney)) + Number(findPlayerData.price);
      console.log(totalAmount);
      await Users.updateOne(
        { _id: "664f0d09e9f856462e178be5" },
        { $set: { totalMoney: totalAmount } }
      );

      await selectPlayers.deleteOne({
        $and: [{ userId: "664f0d09e9f856462e178be5" }, { playerId }],
      });
      res
        .status(200)
        .send({ success: true, message: "Player Deleted Successfully" });
    } else {
      res.status(400).send({ success: true, message: "Player not found" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports.viewSelectedPlayers = async (req, res) => {
  try {
    const findSelectedPlayers = await selectPlayers
      .find({
        userId: "664f0d09e9f856462e178be5",
      })
      .select("-__v")
      .populate({ path: "playerId" });

    res.status(200).send({
      success: true,
      message: "Player find Successfully",
      data: findSelectedPlayers,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports.viewUser = async (req, res) => {
  try {
    const findUserData = await Users.findOne({
      _id: "664f0d09e9f856462e178be5",
    });
    if (findUserData) {
      res.status(200).send({
        success: true,
        message: "user viewed Successfully",
        data: findUserData,
      });
    } else {
      res.status(400).send({ success: false, message: "user not find" });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
