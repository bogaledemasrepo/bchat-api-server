const catchAsync = require("../middleware/CatchAsync");
const AppError = require("./HandlError");
const CItem = require("../model/CItem");
const getAllChatItems = catchAsync(async (req, res) => {
  const resp = await CItem.find(
    {
      members: { $in: [req.user._id] },
    },
    { name: 1, membership: 1 }
  );
  res.status(200).json({ success: true, data: [...resp] });
});

const getFavoriateChatItems = catchAsync(async (req, res) => {
  const resp = await CItem.find(
    {
      $and: [
        {
          members: { $in: [req.user._id] },
        },
        { isFavorite: true },
      ],
    },
    { name: 1, membership: 1 }
  );
  res.status(200).json({ success: true, data: [...resp] });
});
const getAllPersonalChatItems = catchAsync(async (req, res) => {
  const resp = await CItem.find(
    {
      $and: [
        {
          members: { $in: [req.user._id] },
        },
        { membership: "1-1" },
      ],
    },
    { name: 1 }
  );
  res.status(200).json({ success: true, data: [...resp] });
});
const getAllGroupChatItems = catchAsync(async (req, res) => {
  const resp = await CItem.find(
    {
      $and: [
        {
          members: { $in: [req.user._id] },
        },
        { membership: "M-M" },
      ],
    },
    { name: 1 },
    { membership: "m-m", name: 1 }
  );
  res.status(200).json({ success: true, data: [...resp] });
});

const createPersonalChatItem = catchAsync(async (req, res) => {
  const { userId, fullname } = req.body;
  if (!fullname || !userId)
    return next(new AppError("Error invalid user", 400));
  const newgroup = new CItem({
    name: `${req.user.fullname} with ${fullname}`,
    admin: [req.user._id, userId],
    members: [req.user._id, userId],
    membership: "1-1",
  });
  const resp = await newgroup.save();
  res.status(200).json({ success: true, data: { resp } });
});
const createGroupChatItem = catchAsync(async (req, res) => {
  const { groupName, members } = req.body;
  if (!groupName || !members)
    return next(new AppError("Error invalid requesit", 400));
  const newgroup = new CItem({
    name: req.body.groupName,
    admin: [req.user._id],
    members: [...req.body.members, req.user._id],
    membership: "M-M",
  });
  const resp = await newgroup.save();
  res.status(200).json({ success: true, data: { resp } });
});
const addUserToGroupChatItem = catchAsync(async (req, res) => {
  const { groupId, userId } = req.body;
  if (!groupId || !userId)
    return next(new AppError("Bad requesit please provide full info.", 400));
  const resp = await CItem.findById(groupId);
  if (resp.members.includes(userId))
    return res
      .status(502)
      .json({ msg: "The user is allready a member of group." });
  const update = await CItem.findByIdAndUpdate(groupId, {
    members: [...resp.members, userId],
  });
  return res.status(200).json({ success: true, data: { update } });
});
const deleteFromChatItem = catchAsync(async (req, res) => {
  const { chatItemId, userId } = req.body;
  if (!groupId || !userId)
    return next(new AppError("Bad requesit please provide full info.", 400));
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
});

module.exports = {
  getAllChatItems,
  getFavoriateChatItems,
  getAllGroupChatItems,
  getAllPersonalChatItems,
  createGroupChatItem,
  createPersonalChatItem,
  addUserToGroupChatItem,
  deleteFromChatItem,
};
