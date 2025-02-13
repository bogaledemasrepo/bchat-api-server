const CItem = require("../model/CItem");
const getAllChatItems = async (req, res) => {
  try {
    const resp = await CItem.find({
      members: { $in: [req.user._id] },
    });
    res.status(200).json({ success: true, data: { resp } });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
const getAllPersonalChatItems = async (req, res) => {
  try {
    const resp = await CItem.find(
      {
        members: { $in: [req.user._id] },
      },
      { membership: "1-1" }
    );
    res.status(200).json({ success: true, data: { resp } });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};
const getAllGroupChatItems = async (req, res) => {
  try {
    const resp = await CItem.find(
      {
        members: { $in: [req.user._id] },
      },
      { membership: "m-m" }
    );
    res.status(200).json({ success: true, data: { resp } });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

const createPersonalChatItem = async (req, res) => {
  const { userId, fullname } = req.body;
  if (!fullname || !userId)
    res.status(500).json({ msg: "Something went wrong" });
  try {
    const newgroup = new CItem({
      name: `${req.user.fullname} with ${fullname}`,
      admin: [req.user._id, userId],
      members: [req.user._id, userId],
      membership: "1-1",
    });
    const resp = await newgroup.save();
    res.status(200).json({ success: true, data: { resp } });
  } catch (error) {
    res.status(500).json({ msg: `Something went wrong`, error });
  }
};
const createGroupChatItem = async (req, res) => {
  const { groupName, members } = req.body;
  if (!groupName || !members)
    res.status(500).json({ msg: "Something went wrong" });
  try {
    const newgroup = new CItem({
      name: req.body.groupName,
      admin: [req.user._id],
      members: [...req.body.members, req.user._id],
      membership: "M-M",
    });
    const resp = await newgroup.save();
    res.status(200).json({ success: true, data: { resp } });
  } catch (error) {
    res.status(500).json({ msg: `Something went wrong`, error });
  }
};
const addUserToGroupChatItem = async (req, res) => {
  const { groupId, userId } = req.body;
  if (!groupId || !userId)
    return res.status(500).json({ msg: "Something went wrong No" });
  try {
    const resp = await CItem.findById(groupId);
    if (resp.members.includes(userId))
      return res
        .status(502)
        .json({ msg: "The user is allready a member of group." });
    const update = await CItem.findByIdAndUpdate(groupId, {
      members: [...resp.members, userId],
    });
    return res.status(200).json({ success: true, data: { update } });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const deleteFromChatItem = async (req, res) => {
  const { chatItemId, userId } = req.body;
  if (!groupId || !userId)
    return res.status(500).json({ msg: "Something went wrong" });
  try {
    const chatItem = await CItem.findById(chatItemId);
    if (!chatItem) return res.status(500).json({ msg: "Something went wrong" });
    if (chatItem.members.length <= 2) {
      await CItem.findByIdAndDelete(chatItemId);
      return res.status(200).json({ msg: "Deleted succesfully" });
    } else {
      const filterdMember = chatItem.members.filter((Item) => {
        return SON.stringify(Item) !== JSON.stringify(userId);
      });
      await CItem.findByIdAndUpdate(chatItemId, {
        members: [...filterdMember],
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  getAllChatItems,
  getAllGroupChatItems,
  getAllPersonalChatItems,
  createGroupChatItem,
  createPersonalChatItem,
  addUserToGroupChatItem,
  deleteFromChatItem,
};
