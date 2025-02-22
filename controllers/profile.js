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
const uploadPhoto = async (req, res, next) => {
  console.log(req.body, req.file, req.files, "I do no null");
  next();
  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "/public/users/profile");
  //   },
  //   filename: function (req, file, cb) {
  //     const uniqueSuffix = Date.now() + "-" + req.user._id;
  //     cb(null, file.fieldname + "-" + uniqueSuffix);
  //   },
  // });
  // function filterdFile(req, file, cb) {
  //   const uniqueSuffix = Date.now() + "-" + req.user._id;
  //   cb(null, file.fieldname + "-" + uniqueSuffix);
  // }
  // const upload = multer({ storage: storage, fileFilter: filterdFile });
};
module.exports = {
  uploadPhoto,
  getMyProfile,
  deleteMyProfile,
  updateMyProfile,
};
