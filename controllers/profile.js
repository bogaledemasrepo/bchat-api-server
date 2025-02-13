const User = require("../model/user");
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
module.exports = { deleteMyProfile, updateMyProfile };
