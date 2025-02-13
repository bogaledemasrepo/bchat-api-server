const CDetail = require("../model/CDetail");
const getChatDetail = async (req, res) => {
  const { chatItemId } = req.body;
  try {
    const resp = await CDetail.findById(chatItemId);
    res.status(200).json({ success: true, data: { resp } });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
const createChatDetail = async (req, res) => {
  try {
    const newChatDetail = new CDetail.find({
      sender: req.user._id,
      textContent: req.body.textContent,
      file: [""],
      chatItem: req.body.chatItem,
    });
    const resp = await newChatDetail.save();
    return res.status(200).json({ success: true, data: { resp } });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong!" });
  }
};

const deleteChatDetail = async (req, res) => {
  const { chatDetailId } = req.body;
  try {
    const resp = CDetail.findByIdAndDelete(chatDetailId);
    return res.status(200).json({
      success: true,
      data: {
        msg: "Deletion success",
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: { msg: "Something went wrond!" } });
  }
};
const updatChatDetail = async (req, res) => {
  const { chatDetailId } = req.body;
  try {
    const resp = CDetail.findByIdAndUpdate(chatDetailId, {});
    return res.status(200).json({
      success: true,
      data: {
        msg: "Deletion success",
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: { msg: "Something went wrond!" } });
  }
};

module.exports = {
  getChatDetail,
  createChatDetail,
  deleteChatDetail,
  updatChatDetail,
};
