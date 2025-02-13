const Chat = require("../model/chat");
const getAllMyChats = async (req, res) => {
  const resp = await Chat.find({ sender: req.user._id });
  res.json({ msg: "Get All may chats" });
};
const getMyChatWithFriends = async (req, res) => {
  const resp = await Chat.find(
    { sender: req.user._id },
    { chatType: "Individual" }
  );
  res.json({ msg: "Get chats detail with friend someone" });
};
const getChatDetailWithFriend = async (req, res) => {
  const { friendId } = req.param;
  const resp = await Chat.find(
    { sender: { $or: [friendId, "userId"] } },
    { receiver: { $or: [friendId, "userId"] } }
  );
  res.json({ msg: "Get chats detail with friend someone" });
};
const getMyChatWithGroups = async (req, res) => {
  res.json({ msg: "Get chats detail with Group something" });
};
const getChatDetailWithGroup = async (req, res) => {
  res.json({ msg: "Get chats detail with Group something" });
};
const addChatDeatilToGroup = async (req, res) => {
  res.json({ msg: "Add chat detail to Group something" });
};
const addChatDeatilToFriend = async (req, res) => {
  res.json({ msg: "Add chat detail to Friend something" });
};
const deleteChatDeatilFromFriendChat = async (req, res) => {
  res.json({ msg: "Delete chat detail from friend chat" });
};

const deleteChatDeatilFromGroupChat = async (req, res) => {
  res.json({ msg: "Delete chat detail from group chat" });
};
const updateChatDeatilFriendChat = async (req, res) => {
  res.json({ msg: "Update chat detail from friend chat" });
};

const updateChatDeatilGroupChat = async (req, res) => {
  res.json({ msg: "Update chat detail from group chat" });
};

module.exports = {
  getAllMyChats,
  getMyChatWithGroups,
  getChatDetailWithGroup,
  getMyChatWithFriends,
  getChatDetailWithFriend,
  addChatDeatilToGroup,
  addChatDeatilToFriend,
  deleteChatDeatilFromFriendChat,
  deleteChatDeatilFromGroupChat,
  updateChatDeatilFriendChat,
  updateChatDeatilGroupChat,
};
