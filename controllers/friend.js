const Friendrequesit = require("../model/FriendRequesit");
const User = require("../model/user");
const getAllFriends = async (req, res) => {
  try {
    const friendsId = await User.findOne(
      { _id: req.user._id },
      { friends: 1 }
    ).populate({ path: "friends", select: "_id" });
    console.log(friendsId);
    return res.status(200).json({ success: true, data: friendsId });
  } catch (error) {}
  return res.status(401).json({ msg: "Something went wrong!" });
};
const getFriendRequesit = async (req, res) => {
  const { _id } = req.user;
  try {
    const friendRequesits = await Friendrequesit.find(
      { requesitTo: _id },
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
const getFriendRequesitReplay = (req, res) => {
  return res.status(200).json({ msg: "get friend requesit" });
};
const makeFriendRequesitReplay = (req, res) => {
  return res.status(200).json({ msg: "make friend requesit" });
};

const deleteFriend = (req, res) => {
  return res.status(200).json({ msg: "Delete friend" });
};
module.exports = {
  getAllFriends,
  getFriendRequesit,
  getFriendRequesitReplay,
  makeFriendRequesit,
  makeFriendRequesitReplay,
  deleteFriend,
};
