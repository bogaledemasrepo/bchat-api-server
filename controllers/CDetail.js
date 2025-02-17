const CDetail = require("../model/CDetail");
const getChatDetail = async (req, res) => {
  const { chatItemId } = req.params;
  console.log(chatItemId, req.params);
  if (chatItemId) {
    try {
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
    } catch (error) {
      return res.status(500).json({ msg: "Something went wrong", error });
    }
  }
  return res.status(500).json({ msg: "Something went wrong", error });
};
const createChatDetail = async (req, res) => {
  const { chatItemId, textContent, file } = req.body;
  if (!chatItemId) {
    return res.status(500).json({ msg: "Something went wrong!" });
  }
  try {
    const newChatDetail = new CDetail({
      sender: req.user._id,
      textContent: textContent,
      file: [],
      chatItem: chatItemId,
    });
    const resp = await newChatDetail.save();
    return res.status(200).json({ success: true, data: { resp } });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong!", error });
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
