const Friendrequesit = require("../model/FriendRequesit");
const User = require("../model/user");
const getAllFriends = async (req, res) => {
  try {
    const resp = await User.findOne(
      { _id: req.user._id },
      { friends: 1 }
    ).populate("friends");
    return res.status(200).json({ success: true, data: resp.friends });
  } catch (error) {}
  return res.status(401).json({ msg: "Something went wrong!" });
};
const getFriendRequesit = async (req, res) => {
  try {
    const friendRequesits = await Friendrequesit.find(
      { requesitTo: req.user._id },
      { _id: 1, fullname: 1, email: 1, profile: 1 }
    );
    return res.status(200).json({ success: true, data: friendRequesits });
  } catch (error) {
    return res.status(401).json({ msg: "Something went wrong!" });
  }
};
const makeFriendRequesit = (req, res) => {
  try {
    const friendRequesits = new Friendrequesit({
      requestedBy: req.user._id,
      requestedTo: req.body.userId,
    });
    return res.status(200).json({ success: true, data: friendRequesits });
  } catch (error) {
    return res.status(401).json({ msg: "Something went wrong!" });
  }
};
const getFriendRequesitReplay = async (req, res) => {
  try {
    const requesitReplay = await Friendrequesit.find(
      { status: "pending" },
      { requestedBy: req.user._id }
    );
    return res.status(200).json({ success: true, data: requesitReplay });
  } catch (error) {
    return res.status(401).json({ msg: "Something went wrong!" });
  }
};
const makeFriendRequesitReplay = async (req, res) => {
  try {
    const requesitReplay = await Friendrequesit.findByIdAndUpdate(
      req.body.requesitId,
      { status: req.body.responce }
    );
    return res.status(200).json({ success: true, data: requesitReplay });
  } catch (error) {
    return res.status(401).json({ msg: "Something went wrong!" });
  }
};

const deleteFriend = async (req, res) => {
  const toUpdate = await User.findById(req.user._id);
  const updated = toUpdate.friends.filter((Item) => {
    return JSON.stringify(Item) !== JSON.stringify(req.body.userId);
  });
  await User.findByIdAndUpdate(req.user._id, { friends: [...updated] });
  return res.status(200).json({ msg: "Friend deleted" });
};
module.exports = {
  getAllFriends,
  getFriendRequesit,
  getFriendRequesitReplay,
  makeFriendRequesit,
  makeFriendRequesitReplay,
  deleteFriend,
};
