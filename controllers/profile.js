const User = require("../model/user");
const AppError = require("./HandlError");
const catchAsync = require("../middleware/CatchAsync");
const getMyProfile = catchAsync(async (req, res) => {
  const resp = await User.findById(req.user._id, {
    fullname: 1,
    email: 1,
    profile: 1,
    explorable: 1,
  });
  res.json({
    success: true,
    data: resp,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const resp = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.json({
    success: true,
    data: { resp },
  });
});

const deleteMyProfile = catchAsync(async (req, res) => {
  const resp = await User.findByIdAndDelete(req.user._id);
  res.json({
    success: true,
    data: {},
  });
});
const profileUpload = catchAsync(async (req, res) => {
  if (!req.file) return next(new AppError("Unknown server error!", 500));
  const { galery } = await User.findById(req.user._id, { galery: 1 });
  const updatedFile = [...galery, "/public/profile/" + req.file.filename];
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      galery: updatedFile,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({ status: "success", data: updatedUser });
});
module.exports = {
  getMyProfile,
  deleteMyProfile,
  updateMyProfile,
  profileUpload,
};
