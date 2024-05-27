const express = require("express");
const app = express();
const config = require("./config/config.js");
const cors = require("cors");
app.use(express.static("public"));
const port = 4000;

app.use(cors());

const userRoute = require("./routes/userRoute.js");
app.use("/api", userRoute);

const playersRoute = require("./routes/playersRoute.js");
app.use("/api", playersRoute);

app.get("/", (req, res) => {
  res.status(200).send(`
 Hello World!
    `);
});

const startServer = async () => {
  try {
    await config.connectDB();
    app.listen(port, () => {
      console.log(`Server is listen on localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
