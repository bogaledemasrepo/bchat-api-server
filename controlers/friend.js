const getFriendRequesit = (req, res) => {
  res.json({ msg: "get friend requesit" });
};
const makeFriendRequesit = (req, res) => {
  res.json({ msg: "Make friend requesit" });
};
const getFriendRequesitReplay = (req, res) => {
  res.json({ msg: "get friend requesit" });
};
const makeFriendRequesitReplay = (req, res) => {
  res.json({ msg: "make friend requesit" });
};
const getAllFriends = (req, res) => {
  res.json({ msg: "Get all friends" });
};
const deleteFriend = (req, res) => {
  res.json({ msg: "Delete friend" });
};
module.exports = {
  getAllFriends,
  getFriendRequesit,
  getFriendRequesitReplay,
  makeFriendRequesit,
  makeFriendRequesitReplay,
  deleteFriend,
};
