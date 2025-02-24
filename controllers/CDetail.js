const CDetail = require("../model/CDetail");
const AppError = require("./HandlError");
const catchAsync = require("../middleware/CatchAsync");
const getChatDetail = catchAsync(async (req, res) => {
  const { chatItemId } = req.params;
  if (!chatItemId) return next(new AppError("Server error", 500));
  const resp = await CDetail.find(
    { chatItem: chatItemId },
    { sender: 1, createdAt: 1, textContent: 1, file: 1 }
  );
  console.log(resp);
  return resp
    ? res.status(200).json({
        success: true,
        data: resp.map((Item) =>
          JSON.stringify(Item.sender) === JSON.stringify(req.user._id)
            ? { ...Item._doc, sender: "You" }
            : Item
        ),
      })
    : res.status(200).json({ success: true, data: [] });
});
const createChatDetail = catchAsync(async (req, res) => {
  const { chatItemId, textContent, file } = req.body;
  if (!chatItemId || (!textContent && !file))
    return next(
      new AppError("Bad requesit please provid sefficient info.", 400)
    );
  const newChatDetail = new CDetail({
    sender: req.user._id,
    textContent: textContent,
    file: [],
    chatItem: chatItemId,
  });
  const resp = await newChatDetail.save();
  return res.status(200).json({ status: "success", data: resp });
});

const deleteChatDetail = catchAsync(async (req, res) => {
  const { chatDetailId } = req.body;
  if (!chatDetailId)
    return next(new AppError("Please provide chat detail id.", 400));
  const resp = await CDetail.findByIdAndDelete(chatDetailId);
  return res.status(200).json({
    status: "success",
    data: {
      msg: "Deletion success",
    },
  });
});
const updatChatDetail = catchAsync(async (req, res) => {
  const { chatDetailId } = req.body;
  if (!chatDetailId)
    return next(new AppError("Please provide chat detail id.", 400));
  const resp = await CDetail.findByIdAndUpdate(
    chatDetailId,
    {},
    { new: true, runValidators: true }
  );
  return res.status(200).json({
    status: "success",
    data: {
      msg: "Deletion success",
    },
  });
});

module.exports = {
  getChatDetail,
  createChatDetail,
  deleteChatDetail,
  updatChatDetail,
};
