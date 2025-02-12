const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "chat must have chat sender"],
  },
  chatType: {
    type: "Individual" || "Group",
    required: true,
  },
  sendTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User" || "Group",
    required: [true, "chat must have chat receiver"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  textContent: String,
  file: [
    {
      memType: String,
      url: String,
    },
  ],
});
module.exports = mongoose.Model("Chat", chatSchema);
