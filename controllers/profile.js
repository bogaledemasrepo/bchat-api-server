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
    res.json({
      success: true,
      data: { resp },
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

module.exports = { getMyProfile, deleteMyProfile, updateMyProfile };
