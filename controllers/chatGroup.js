const Group = require("../model/group");
const fetchUserChatGroups = async (req, res) => {
  try {
    const resp = await Group.find({
      members: { $in: [req.user._id] },
    });
    res.status(200).json({ success: true, data: { resp } });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
const createChatGroup = async (req, res) => {
  const { name, members } = req.body;
  if (!name || !members) res.status(500).json({ msg: "Something went wrong" });
  try {
    const newgroup = new Group({
      name,
      admin: req.user._id,
      members: [...members, req.user._id],
    });
    const resp = await newgroup.save();
    res.status(200).json({ success: true, data: { resp } });
  } catch (error) {
    res.status(500).json({ msg: `Something went wrong` });
  }
};
const addUserToChatGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  if (!groupId || !userId)
    return res.status(500).json({ msg: "Something went wrong No" });
  try {
    const resp = await Group.findById(groupId);
    console.log(resp, "Oppp..........");
    if (resp.members.includes(userId))
      return res
        .status(502)
        .json({ msg: "The user is allready a member of group." });
    const update = await Group.findByIdAndUpdate(groupId, {
      members: [...resp.members, userId],
    });
    return res.status(200).json({ success: true, data: { update } });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const deleteUserFromChatGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  if (!groupId || !userId)
    return res.status(500).json({ msg: "Something went wrong" });
  try {
    const resp = await Group.findById(groupId);

    const updatedMember = resp.members.filter((Item) => {
      return JSON.stringify(Item) === JSON.stringify(userId);
    });
    console.log(userId, updatedMember);
    const update = await Group.findByIdAndUpdate(groupId, {
      members: updatedMember,
    });
    return res.status(200).json({ success: true, data: { update } });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  fetchUserChatGroups,
  createChatGroup,
  addUserToChatGroup,
  deleteUserFromChatGroup,
};
