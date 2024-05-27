const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/uploades"),
      function (error, success) {
        if (error) throw error;
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "_" + file.originalname.replace(/\s+/g, "");
    cb(null, name, function (error1, success1) {
      if (error1) throw error1;
    });
  },
});
const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

module.exports = { uploadImage };
