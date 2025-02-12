const getAllMyChats = async (req, res) => {
  res.json({ msg: "Get All may chats" });
};
const getMyChatWithFriends = async (req, res) => {
  res.json({ msg: "Get chats detail with friend someone" });
};
const getChatDetailWithFriend = async (req, res) => {
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
