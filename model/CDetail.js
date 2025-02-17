const mongoose = require("mongoose");
const chatDetailSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "chat must have chat sender"],
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
  chatItem: {
    type: mongoose.Schema.ObjectId,
    ref: "CItem",
  },
});
module.exports = mongoose.model("CDetail", chatDetailSchema);
