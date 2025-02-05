const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  member: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  data: [
    {
      senderId: { type: mongoose.Schema.ObjectId, ref: "User" },
      sentAt: Date,
      content: String,
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
