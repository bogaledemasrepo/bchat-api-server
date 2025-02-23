const multer = require("multer");
const path = require("path");
module.exports = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/profile"));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + req.user._id + `${Date.now()}` + ".png");
    },
  });
  const upload = multer({ storage: storage }).single("profile");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(new AppError("A Multer error occurred when uploading.", 500));
    } else if (err) {
      console.log(err);
      return next(
        new AppError("An unknown error occurred when uploading.", 500)
      );
    }
    next();
  });
};
