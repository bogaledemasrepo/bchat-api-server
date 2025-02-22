const multer = require("multer");
const path = require("path");
const User = require("../model/user");
const getMyProfile = async (req, res) => {
  try {
    const resp = await User.findById(req.user._id, {
      fullname: 1,
      email: 1,
      profile: 1,
    });
    res.json({
      success: true,
      data: resp,
    });
  } catch (err) {
    res.json({
      success: false,
      data: {
        msg: "Something went wrong",
      },
    });
  }
};
const updateMyProfile = async (req, res) => {
  try {
    const resp = await User.findByIdAndUpdate(req.user._id, {});
    return res.json({
      success: true,
      data: { resp },
    });
  } catch (err) {
    return res.json({
      success: false,
      data: {
        msg: "Something went wrong",
      },
    });
  }
};
const deleteMyProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.json({
      success: false,
      data: {
        msg: "Something went wrong",
      },
    });
  }
};

function uploadProfilePhoto(req, res) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/profile"));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + req.user._id + ".png");
    },
  });
  const upload = multer({ storage: storage }).single("profile");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.json({
        status: "fail",
        msg: "A Multer error occurred when uploading.",
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.json({
        status: "fail",
        msg: "An unknown error occurred when uploading.",
      });
    }
    res.status(200).json({ status: "success", msg: "successfully uploaded" });
    // Everything went fine.
  });
}
module.exports = {
  getMyProfile,
  deleteMyProfile,
  updateMyProfile,
  uploadProfilePhoto,
};
