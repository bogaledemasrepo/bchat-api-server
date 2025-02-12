const fetchUserChatGroups = async (req, res) => {
  res.json({ msg: "fetch User Chat Groups" });
};
const createChatGroup = (req, res) => {
  res.json({ msg: "Create Chat Group" });
};
const addUserToChatGroup = (req, res) => {
  res.json({ msg: "add User ro Chat Group" });
};
const deleteUserFromChatGroup = (req, res) => {
  res.json({ msg: "delete User from Chat Group" });
};

module.exports = {
  fetchUserChatGroups,
  createChatGroup,
  addUserToChatGroup,
  deleteUserFromChatGroup,
};
