const Friendrequesit = require("../model/FriendRequesit");
const User = require("../model/user");
const catchAsync = require("../middleware/CatchAsync");
const AppError = require("./HandlError");
const getAllFriends = catchAsync(async (req, res) => {
  const resp = await User.findOne(
    { _id: req.user._id },
    { friends: 1 }
  ).populate("friends");
  return res.status(200).json({ status: "success", data: resp.friends });
});
const getFriendRequesit = catchAsync(async (req, res) => {
  const friendRequesits = await Friendrequesit.find(
    { requesitTo: req.user._id },
    { _id: 1, fullname: 1, email: 1, profile: 1 }
  );
  return res.status(200).json({ status: "success", data: friendRequesits });
});
const makeFriendRequesit = catchAsync(async (req, res, next) => {
  const { requesitTo } = req.body;
  if (!requesitTo)
    return next(new AppError("Bad requesit provide requesit receiver", 400));
  const haveUserById = await User.findById(requesitTo);
  if (!haveUserById)
    return next(new AppError("Bad requesit no user by this id.", 400));
  const friendRequesits = new Friendrequesit({
    requestedBy: req.user._id,
    requestedTo: requesitTo,
  });
  return res.status(200).json({ status: "success", data: friendRequesits });
});
const getFriendRequesitReplay = catchAsync(async (req, res) => {
  const requesitReplay = await Friendrequesit.find(
    { status: "pending" },
    { requestedBy: req.user._id }
  );
  return res.status(200).json({ status: "success", data: requesitReplay });
});
const makeFriendRequesitReplay = catchAsync(async (req, res) => {
  const requesitReplay = await Friendrequesit.findByIdAndUpdate(
    req.body.requesitId,
    { status: req.body.responce }
  );
  return res.status(200).json({ status: "success", data: requesitReplay });
});

const deleteFriend = catchAsync(async (req, res) => {
  const toUpdate = await User.findById(req.user._id);
  const updated = toUpdate.friends.filter((Item) => {
    return JSON.stringify(Item) !== JSON.stringify(req.body.userId);
  });
  await User.findByIdAndUpdate(req.user._id, { friends: [...updated] });
  return res.status(200).json({ status: "success", message: "Friend deleted" });
});
module.exports = {
  getAllFriends,
  getFriendRequesit,
  getFriendRequesitReplay,
  makeFriendRequesit,
  makeFriendRequesitReplay,
  deleteFriend,
};
