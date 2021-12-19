const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error(
          "Please upload a picture one of the .jpg .jpeg veya .png extensions!"
        )
      );
    }

    cb(undefined, true);
  },
});

module.exports = upload;
